import React from "react";
import { Input, Button, Form, Card, Divider, Typography, Row, Col } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

const { Title, Text } = Typography;

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get booking data from BookRide
  const { car, pickupLocation, dropLocation, pickupTime, dates, totalCost } = location.state || {};
  const rentalDays = dates ? moment(dates[1]).diff(moment(dates[0]), 'days') + 1 : 0;

  const handlePayment = () => {
    form.validateFields().then(() => {
      navigate("/payment-page");
    });
  };

  if (!location.state) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <Title level={4}>No booking data found. Please start a new booking.</Title>
        <Button type="primary" onClick={() => navigate("/book-ride")}>
          Book a Ride
        </Button>
      </div>
    );
  }

  return (
    <div style={{ 
      width: "99vw", 
      // margin: "85px auto 40px", 
      // padding: "20px",
      backgroundColor: "#f5f5f5",
      height:"auto"
    }}>
      <Card style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={2} style={{ textAlign: "center", color: "#fa4226", marginBottom: "30px" }}>
          Vehicle Payment
        </Title>

        <Row gutter={24}>
          {/* Left Column - Vehicle and Trip Details */}
          <Col xs={24} md={12}>
            <Card title="Trip Summary" style={{ marginBottom: "24px" }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Vehicle:</Text>
                  <div style={{ margin: "8px 0" }}>
                    <Text>{car?.model}</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Type:</Text>
                  <div style={{ margin: "8px 0" }}>
                    <Text>{car?.make}</Text>
                  </div>
                </Col>
              </Row>

              <Divider />

              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>From:</Text>
                  <div style={{ margin: "8px 0" }}>
                    <Text>{pickupLocation}</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>To:</Text>
                  <div style={{ margin: "8px 0" }}>
                    <Text>{dropLocation}</Text>
                  </div>
                </Col>
              </Row>

              <Divider />

              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Pickup:</Text>
                  <div style={{ margin: "8px 0" }}>
                    <Text>
                      {moment(dates[0]).format('MMM D, YYYY')}<br />
                      {moment(pickupTime).format('h:mm A')}
                    </Text>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Return:</Text>
                  <div style={{ margin: "8px 0" }}>
                    <Text>{moment(dates[1]).format('MMM D, YYYY')}</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Right Column - Payment Details */}
          <Col xs={24} md={12}>
            <Card title="Payment Details" style={{ marginBottom: "24px" }}>
              <Row gutter={16}>
                <Col span={16}>
                  <Text>Daily Rate × {rentalDays} days</Text>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <Text>₹{car?.daily_rate * rentalDays}</Text>
                </Col>
              </Row>

              <Row gutter={16} style={{ margin: "12px 0" }}>
                <Col span={16}>
                  <Text>Insurance</Text>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <Text>₹0</Text>
                </Col>
              </Row>

              <Divider />

              <Row gutter={16}>
                <Col span={16}>
                  <Text strong>Total Amount</Text>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <Title level={4} style={{ margin: 0, color: "#fa4226" }}>₹{totalCost}</Title>
                </Col>
              </Row>
            </Card>

            {/* Customer Form */}
            <Card title="Customer Information">
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                      <Input placeholder="Your first name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                      <Input placeholder="Your last name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                      <Input placeholder="Phone number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                      <Input placeholder="Email address" />
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={handlePayment}
                  style={{
                    backgroundColor: "#fa4226",
                    border: "none",
                    height: "45px",
                    fontWeight: "bold",
                    marginTop: "16px"
                  }}
                >
                  Proceed to Payment
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CheckoutPage;