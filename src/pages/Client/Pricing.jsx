import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Logger from '../../library/Logger';
import useServicesContext from '../../hooks/useServicesContext';

const Pricing = () => {
  const { subsService } = useServicesContext();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    (async () => {
      // Auth 
      try {
        const data = await subsService.getSubs();
        setSubscriptions(data);
        console.log(data);
      } catch (error) {
        Logger.error(error.message);
      }
    })();
  }, []);

  const handleSubscriptionSelect = (subscription) => {
    // Handle subscription selection logic here
    console.log("Selected subscription:", subscription);
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
                    {`€${subscription.price}`}
                    <small className="text-muted">
                      / {subscription.duration}
                    </small>
                  </h1>
                  <p>{subscription.description}</p>
                  <Button
                    variant="primary"
                    onClick={() => handleSubscriptionSelect(subscription)}
                  >
                    Select
                  </Button>
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
