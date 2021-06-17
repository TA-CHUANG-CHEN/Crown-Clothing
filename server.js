const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser"); // deprecated by express 4
const path = require("path");
const process = require("process"); // don't need !

if (process.env.NODE_ENV !== "prodcction") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000; //heroku produce for us
/* 
app.use(bodyParser.json());
app.use(bodyParser, urlencoded({ extended: true })); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "cliend/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw erorr;
  console.log(`Server running on port: ${port} `);
});

app.post("/payment", (req, res) => {
  const body = {
    sourece: req.body.token.id,
    amount: req.body.amount,
    currency: "twd",
  };
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
