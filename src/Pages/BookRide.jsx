import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Select, DatePicker, TimePicker, Button, Typography, Row, Col, message, Spin } from "antd";
import moment from "moment";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

function BookRide() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupTime, setPickupTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetch(`https://car-rentals-json-server.onrender.com/api/cars/${carId}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((error) => console.error("Error fetching car details:", error));
  }, [carId]);

  const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"];

  // const handleDateChange = (dates) => {
  //   if (dates && car) {
  //     setDates(dates);
  //     const days = moment(dates[1]).diff(moment(dates[0]), "days") + 1;
  //     setTotalCost(days * car.daily_rate);
  //   }
  // };
  const handleDateChange = (dates) => {
    if (dates && car) {
      setDates(dates);
      const start = new Date(dates[0]);
      const end = new Date(dates[1]);
  
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; 
      setTotalCost(days * car.daily_rate);
    }
  };
  

  const handleProceed = () => {
    if (!pickupLocation || !dropLocation || !pickupTime || dates.length === 0) {
      message.error("Please fill all fields before proceeding!");
      return;
    }
    navigate("/checkout", {
      state: { car, pickupLocation, dropLocation, pickupTime, dates, totalCost },
    });
  };

  if (!car) {
    return (
      <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Spin size="large" style={{ color: "#fa4226" }} />
    </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", width: "100vw", backgroundColor: "#f5f5f5", padding: "40px 20px",overflow:"hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Button type="link" onClick={() => navigate(-1)} style={{ marginBottom: "20px", fontSize: "16px" }}>
          {/* <ArrowLeftOutlined /> Back */}
        </Button>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", color: "#fa4226" }}>
          🚗 Book Your Ride
        </Title>
        <Row gutter={[24, 24]} justify="center" align="middle">
          <Col xs={24} md={10}>
            <Card hoverable style={{ borderRadius: "10px", textAlign: "center", padding: "20px" }}>
              <img src={car.image} alt={car.model} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
              <Title level={3} style={{ marginTop: "15px", color: "#333" }}>{car.model}</Title>
              <Text strong>Brand:</Text> {car.make} <br />
              <Text strong>Year:</Text> {car.year} <br />
              <Text strong>Mileage:</Text> {car.mileage} km <br />
              <Text strong>Seats:</Text> 5 <br />
              <Text strong>Transmission:</Text> Automatic <br />
              <Text strong>Fuel Type:</Text> Diesel <br />
              <Title level={4} style={{ color: "black", marginTop: "10px" }}>₹{car.daily_rate} /per day</Title>
            </Card>
          </Col>
          <Col xs={24} md={14}>
            <Card style={{ borderRadius: "10px", padding: "20px" }}>
              <Title level={4} style={{color:"#fa4226"}}>Booking Details</Title>
              <Select
                placeholder="Select Pickup Location"
                value={pickupLocation}
                onChange={setPickupLocation}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                {cities.map((city) => (
                  <Option key={city} value={city}>{city}</Option>
                ))}
              </Select>
              <Select
                placeholder="Select Drop Location"
                value={dropLocation}
                onChange={setDropLocation}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                {cities.map((city) => (
                  <Option key={city} value={city}>{city}</Option>
                ))}
              </Select>
              <TimePicker
                use12Hours
                format="h:mm A"
                placeholder="Select Pickup Time"
                value={pickupTime}
                onChange={setPickupTime}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <RangePicker onChange={handleDateChange} style={{ width: "100%", marginBottom: "10px" }} />
              <Title level={4} style={{ marginTop: "10px", textAlign: "center" }}>
                Total Cost: ₹{totalCost.toLocaleString()}
              </Title>
              <Button
                type="primary"
                block
                onClick={handleProceed}
                disabled={!pickupLocation || !dropLocation || !pickupTime || dates.length === 0}
                style={{
                  backgroundColor: totalCost > 0 ? "#fa4226" : "#ccc",
                  borderColor: totalCost > 0 ? "#fa4226" : "#ccc",
                  fontWeight: "bold",
                  fontSize: "16px",
                  height: "45px",
                  marginTop: "10px",
                }}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BookRide;
