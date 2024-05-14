import React, { useContext } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import UserContext from "./contexts/UserContext";

const PayPalButton = (props) => {
  const { user } = useContext(UserContext)
  console.log(user)
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
      onApprove={ async (data, actions) => {
        const order = await actions.order?.capture();
        console.log("order", order);
      }}
    />
  );
};

export default PayPalButton;