import React from "react";
import { Result, Button, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined, HomeOutlined, CreditCardOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width:"99vw",
      height: "85vh",
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
        <CloseCircleOutlined style={{
          fontSize: "72px",
          color: "#ff4d4f",
          marginBottom: "24px"
        }} />

        <Title level={3} style={{ color: "#ff4d4f", marginBottom: "8px" }}>
          Payment Failed
        </Title>
        
        <Text type="secondary" style={{ fontSize: "16px", marginBottom: "24px" }}>
          We couldn't process your payment. Please check your payment details and try again.
        </Text>

        <div style={{
          backgroundColor: "#fff2f0",
          border: "1px solid #ffccc7",
          borderRadius: "8px",
          padding: "16px",
          margin: "24px 0",
          textAlign: "left"
        }}>
          <Text strong style={{ display: "block", marginBottom: "8px" }}>Possible reasons:</Text>
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <li><Text>Insufficient funds in your account</Text></li>
            <li><Text>Incorrect card details entered</Text></li>
            <li><Text>Bank declined the transaction</Text></li>
            <li><Text>Network issues during payment</Text></li>
          </ul>
        </div>

        <Space size="middle" style={{ marginTop: "32px" }}>
          {/* <Button
            type="primary"
            size="large"
            icon={<CreditCardOutlined />}
            onClick={() => navigate("/checkout")}
            style={{
              backgroundColor: "#fa4226",
              borderColor: "#fa4226",
              fontWeight: "500"
            }}
          >
            Try Payment Again
          </Button> */}
          
          <Button
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </Space>

        <Text type="secondary" style={{ 
          display: "block", 
          marginTop: "24px",
          fontSize: "14px"
        }}>
          Need help? Contact our support team at support@nookride.com
        </Text>
      </Card>
    </div>
  );
};

export default PaymentFailure;