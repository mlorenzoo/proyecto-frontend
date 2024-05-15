import React, { useContext } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import UserContext from "./contexts/UserContext";
import useServicesContext from "./hooks/useServicesContext";

const PayPalButton = (props) => {
  const { user } = useContext(UserContext);
  const { payService } = useServicesContext();

  const handleApprove = async (data, actions) => {
    const order = await actions.order?.capture();
    console.log("order", order);

    // Llamar a la función de devolución de llamada si está definida
    if (props.onSuccess) {
      props.onSuccess(order);
    }
  };

  return (
    <PayPalButtons 
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.totalValue,
              },
            },
          ],
        });
      }}
      onApprove={handleApprove}
    />
  );
};

export default PayPalButton;
