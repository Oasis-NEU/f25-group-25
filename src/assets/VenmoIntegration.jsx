import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const CLIENT_ID =
  "AXiY9kF2C_QFi6KiEdPPuH1S8zXBIz9pE-FkRgqZJBRyUUulU9PH89C9XPal3PF57EsueQ85NmXDeldu";

export default function VenmoIntegration() {
  const initialOptions = {
    "client-id": CLIENT_ID,
    currency: "USD",
    components: "buttons,funding-eligibility",
    "enable-funding": "venmo"
  };

  // creates a paypal order
  const createOrder = (data, actions) => {
    console.log(data);
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Toll",
            amount: {
              currency_code: "USD",
              value: 10 //change to amount
            }
          }
        ]
      })
      .then((orderID) => orderID)
      .catch((err) => console.log(err, "createOrder error"));
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        console.log(details);
      })
      .catch((err) => console.log(err, "onApprove err"));
  };

  return (
    <div className="flex justify-center outline-2 mt-20">
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={createOrder}
                onApprove={onApprove}
                />
            </PayPalScriptProvider>
        </div>
    </div>

  );
}
