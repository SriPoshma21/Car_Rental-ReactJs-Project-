// import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { Button, message, Typography, Spin, Alert } from "antd";
// import { useNavigate } from "react-router-dom";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const CARD_OPTIONS = {
//   style: {
//     base: {
//       fontSize: "16px",
//       color: "#424242",
//       "::placeholder": {
//         color: "#aab7c4",
//       },
//     },
//     invalid: {
//       color: "#ff4d4f",
//     },
//   },
// };

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setPaymentSuccess(null);

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       message.error(error.message);
//       setPaymentSuccess(false);
//       setLoading(false);
//     } else {
//       message.success("Payment successful!");
//       setPaymentSuccess(true);
//       setLoading(false);
      
//       // Navigate to PaymentSuccess page after 2 seconds
//       setTimeout(() => {
//         navigate("/payment-success");
//       }, 2000);
//     }
//   };

//   return (
//     <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", padding: "20px" }}>
//       <div style={{ width: "100%", maxWidth: "500px", backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0px 6px 15px rgba(0,0,0,0.1)", textAlign: "center" }}>
//         <Title level={3} style={{ color: "#fa4226", marginBottom: "10px" }}>Secure Payment</Title>
//         <Text type="secondary">Enter your card details below</Text>

//         <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
//   <Text type="secondary" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
//     Test Card: 4242 4242 4242 4242
//   </Text>

//   <div style={{ padding: "15px", border: "1px solid #d9d9d9", borderRadius: "8px", marginBottom: "20px", background: "#fafafa" }}>
//     <CardElement options={CARD_OPTIONS} />
//   </div>

//   <Button type="primary" htmlType="submit" loading={loading} disabled={!stripe} style={{ width: "100%", height: "50px", fontSize: "16px", fontWeight: "bold", backgroundColor: "#fa4226", borderColor: "#fa4226", borderRadius: "8px" }}>
//     {loading ? <Spin /> : "Pay Now"}
//   </Button>
// </form>


//         {paymentSuccess === true && (
//           <Alert message="Payment Successful!" type="success" showIcon icon={<CheckCircleOutlined />} style={{ marginTop: "20px" }} />
//         )}
//         {paymentSuccess === false && (
//           <Alert message="Payment Failed!" type="error" showIcon icon={<CloseCircleOutlined />} style={{ marginTop: "20px" }} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, message, Typography, Spin, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424242",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#ff4d4f" },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setPaymentStatus(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      message.error(error.message);
      setPaymentStatus("failed");
      setLoading(false);

      // Redirect to failure page after 2 seconds
      setTimeout(() => {
        navigate("/payment-failure");
      }, 2000);
    } else {
      message.success("Payment successful!");
      setPaymentStatus("success");
      setLoading(false);

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate("/payment-success");
      }, 2000);
    }
  };

  return (
    <div
      style={{
        width: "99vw",
        height: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Title level={3} style={{ color: "#FF9800", marginBottom: "10px" }}>
          Secure Payment
        </Title>
        <Text type="secondary">Enter your card details below</Text>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <Text
            type="secondary"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
            }}
          >
            Test Card: <strong>4242 4242 4242 4242</strong>
          </Text>

          <div
            style={{
              padding: "15px",
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              marginBottom: "20px",
              background: "#fafafa",
            }}
          >
            <CardElement options={CARD_OPTIONS} />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={!stripe}
            style={{
              width: "100%",
              height: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#FF9800",
              borderColor: "#FF9800",
              borderRadius: "8px",
            }}
          >
            {loading ? <Spin /> : "Pay Now"}
          </Button>
        </form>

        {paymentStatus === "success" && (
          <Alert
            message="Payment Successful!"
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
            style={{ marginTop: "20px" }}
          />
        )}
        {paymentStatus === "failed" && (
          <Alert
            message="Payment Failed!"
            type="error"
            showIcon
            icon={<CloseCircleOutlined />}
            style={{ marginTop: "20px" }}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
