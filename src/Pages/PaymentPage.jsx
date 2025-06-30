import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Pages/CheckoutForm";
import { Spin, Alert } from "antd";

const stripePromise = loadStripe("pk_test_51R9LK6PV1vZmFxw3VvnVxbMr3AA956LfW0jGF3CpeDXoxU4v2c7NxYzkYZY26gr96PHpx2xcfE6mamFRam2P2SA600zpcNb534");

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://car-rentals-json-server.onrender.com/create-payment-intent", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000, currency: "usd" }),
  })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch client secret");
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",width:"100vw" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert message={error} type="error" />
      </div>
    );
  }

  return (
    <div>
      {/* <h2>Complete Your Payment</h2> */}
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;