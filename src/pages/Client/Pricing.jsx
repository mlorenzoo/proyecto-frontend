import React, { useState, useEffect, useContext } from "react";
import { Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Logger from '../../library/Logger';
import useServicesContext from '../../hooks/useServicesContext';
import PayPalButton from "../../PayPalButton";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const { subsService, userService, payService } = useServicesContext();
  const [subscriptions, setSubscriptions] = useState([]);
  const [profile, setProfile] = useState([]);
  const [clientId, setClientId] = useState([]);
  const [isSub, setIsSub] = useState([]);
  const { authToken } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const { order } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUser = await userService.getOne(authToken);
        console.log(dataUser);
        setProfile(dataUser.user);

        const data = await subsService.getSubs();
        setSubscriptions(data);

        const client = await userService.getClient(dataUser.user.id);
        setClientId(client);

        const clientSub = await userService.getIfSub(client);
        setIsSub(clientSub);
      } catch (error) {
        Logger.error(error.message);
      }
    };
    fetchData(); // Fixed the immediately invoked function
  }, [authToken, navigate, setProfile, subsService, userService]);

  useEffect(() => {
    if (!user) {
      navigate('/unauthorized');
    }
  }, [authToken, navigate, user]);

  const handleSubscriptionSelect = (subscription) => {
    console.log("Selected subscription:", subscription);
  };

  const handleOrderCapture = async (orderData, plan, price, profileId) => {
    console.log("Orden capturada:", orderData);
    if (orderData.status === 'COMPLETED') {
      try {
        const currentDate = new Date();
        console.log(currentDate);
        const pay = await payService.newPayment(profile.id, currentDate, plan, price, clientId);
        alert("Completed");
        navigate("/");
      } catch (error) {
        alert("Error en la creación del pago. Por favor, inténtalo de nuevo más tarde.");
        console.log(error);
      }
    } else {
      alert("Error en el pago");
    }
  };

  return (
    <Layout>
      <section id="pricing" className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1>Elige tu experiencia de CORTE-Z</h1>
            <p>Cortes exclusivos, comodidad sin igual. Únete a la experiencia de suscripción</p>
          </div>
        </div>
        <div className="row justify-content-center">
          {subscriptions.map(subscription => (
            <div key={subscription.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">
                    {subscription.plan}
                  </h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    {`${subscription.price}$`}
                    <small className="text-muted">
                      / {subscription.duration}
                    </small>
                  </h1>
                  <p>{subscription.description}</p>
                  {isSub ? (
                    <div className="alert alert-info">
                      Ya estás suscrito a nuestros servicios
                    </div>
                  ) : (
                    <PayPalButton 
                      totalValue={subscription.price} 
                      invoice={subscription.plan} 
                      onSuccess={(orderData) => handleOrderCapture(orderData, subscription.plan, subscription.price)} 
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
