import React from "react";
import { Button, Card, Typography, Space, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleOutlined, HomeOutlined, CarOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails || {};

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width:"99vw",
      minHeight: "85vh",
      backgroundColor: "#f5f5f5",
      padding: "20px"
    }}>
      <Card style={{
        width: "100%",
        maxWidth: "600px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <CheckCircleOutlined style={{
          fontSize: "72px",
          color: "#52c41a",
          marginBottom: "24px"
        }} />

        <Title level={3} style={{ color: "#52c41a", marginBottom: "8px" }}>
          Payment Successful!
        </Title>
        
        <Text style={{ fontSize: "23px", marginBottom: "24px" }}>
          Your ride has been booked successfully. A confirmation has been sent to your email.
        </Text>

        {bookingDetails.vehicle && (
          <div style={{
            backgroundColor: "#f6ffed",
            border: "1px solid #b7eb8f",
            borderRadius: "8px",
            padding: "16px",
            margin: "24px 0",
            textAlign: "left"
          }}>
            <Title level={5} style={{ marginBottom: "16px" }}>
              <CarOutlined /> Booking Summary
            </Title>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <Text strong>Vehicle:</Text>
              <Text>{bookingDetails.vehicle.model}</Text>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <Text strong>Pickup:</Text>
              <Text>{bookingDetails.pickupLocation}</Text>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <Text strong>Drop-off:</Text>
              <Text>{bookingDetails.dropLocation}</Text>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <Text strong>Dates:</Text>
              <Text>
                {new Date(bookingDetails.dates[0]).toLocaleDateString()} - {' '}
                {new Date(bookingDetails.dates[1]).toLocaleDateString()}
              </Text>
            </div>
            
            <Divider style={{ margin: "12px 0" }} />
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>Total Paid:</Text>
              <Text strong>₹{bookingDetails.totalCost?.toFixed(2)}</Text>
            </div>
          </div>
        )}

        <Space size="middle" style={{ marginTop: "24px" }}>
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#fa4226",
              borderColor: "#fa4226",
              fontWeight: "500"
            }}
          >
            Return to Home
          </Button>
          
          <Button
            size="large"
            icon={<MailOutlined />}
            onClick={() => alert("Confirmation email resent!")}
          >
            Resend Email
          </Button>
        </Space>

        <Text type="secondary" style={{ 
          display: "block", 
          marginTop: "24px",
          fontSize: "14px"
        }}>
          Need help? Contact our support team at support@bookride.com
        </Text>
      </Card>
    </div>
  );
};

export default PaymentSuccess;