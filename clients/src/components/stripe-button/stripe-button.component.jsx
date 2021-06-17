import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Ix4EGGRC00fpJdOUbItU1G6TpFaEeL1TIkgTyM03XGjrWzmm8Oe1O2haFg3pq6LbJKG8chVR7llGwFcgZEQjDlG003cLwL90U";

  /*  const data = (token) => {
    return {
      amount: priceForStripe,
      token,
    };
  }; */
  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert(`payment successful`);
      })
      .catch((error) => console.log("there was an issue with your payment"));
  };

  /*  const tokenGo = () => {
    const fetchOption = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
    fetch("payment", fetchOption)
      .then((res) => res.json())
      .then(() => {
        alert(`payment successful`);
      })
      .catch((error) => console.log("there was an issue with your payment"));
  }; */

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
