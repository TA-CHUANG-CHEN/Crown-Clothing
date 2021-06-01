import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Ix4EGGRC00fpJdOUbItU1G6TpFaEeL1TIkgTyM03XGjrWzmm8Oe1O2haFg3pq6LbJKG8chVR7llGwFcgZEQjDlG003cLwL90U";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful Bitch! ");
  };
  return (
    <StripeCheckout
      currency="TWD"
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      // Note: enabling both zipCode checks and billing or shipping address will
      // cause zipCheck to be pulled from billing address (set to shipping if none provided).
      image="https://stripe.com/img/documentation/checkout/marketplace.png"
      description={`Just Pay for what u choose, douche!! totoal is ${price}`} // the pop-in header subtitle
      amount={priceForStripe}
      panelLabel="Pay Now!! mother fucker!"
      token={onToken} // submit callback
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
