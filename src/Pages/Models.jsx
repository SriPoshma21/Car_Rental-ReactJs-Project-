import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Spin, message } from "antd";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Login from "../components/Login";

function Models() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://car-rentals-json-server.onrender.com/api/cars",
          {
            timeout: 5000,
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        message.error("Failed to load car data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleBookRide = (carId) => {
    if (isAuthenticated) {
      navigate(`/book-ride/${carId}`);
    } else {
      setAuthModalVisible(true);
    }
  };

  const handleLoginRedirect = () => {
    setAuthModalVisible(false);
    setLoginModalVisible(true);
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <Spin size="large" fullscreen />
      </div>
    );
  }

  return (
    <>
      <section style={{ padding: "20px" }}>
        <HeroPages name="Vehicle Models" />
        <div className="container">
          <Row gutter={[16, 16]} justify="center">
            {cars.map((car) => (
              <Col key={car.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      src={car.image}
                      alt={car.model}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <div style={{ padding: "16px" }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}>
                      <div>
                        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{car.model}</p>
                        ⭐⭐⭐⭐⭐
                      </div>
                      <div>
                        <h4 style={{ fontSize: "20px", color: "#1890ff" }}>₹{car.daily_rate}</h4>
                        <p>per day</p>
                      </div>
                    </div>
                    <div style={{ fontSize: "14px", color: "#555", marginBottom: "12px" }}>
                      <span><strong>Brand:</strong> {car.make}</span><br />
                      <span><strong>Year:</strong> {car.year}</span><br />
                      <span><strong>Mileage:</strong> {car.mileage} km</span><br />
                      <span><strong>Seats:</strong> 5</span><br />
                      <span><strong>Transmission:</strong> Automatic</span><br />
                      <span><strong>Fuel Type:</strong> Petrol</span>
                    </div>
                    <Button
                      type="primary"
                      block
                      style={{
                        backgroundColor: "#fa4226",
                        borderColor: "#FF9800",
                        color: "white",
                      }}
                      onClick={() => handleBookRide(car.id)}
                    >
                      Book Ride
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <Footer />
      </section>

      {/* Authentication Required Modal */}
      <Modal
        title="Authentication Required"
        open={authModalVisible}
        onCancel={() => setAuthModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setAuthModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="login"
            type="primary"
            onClick={handleLoginRedirect}
            style={{ backgroundColor: "#fa4226", borderColor: "#fa4226" }}
          >
            Login
          </Button>,
        ]}
        centered
        width={400}
      >
        <p style={{ textAlign: "center", fontSize: "16px",width:"350px" }}>
          You need to login to book a vehicle. Please sign in to continue.
        </p>
      </Modal>

      {/* Login Modal */}
      <Modal
        title="Login to Your Account"
        open={loginModalVisible}
        onCancel={() => setLoginModalVisible(false)}
        footer={null}
        centered
        width={400}
        bodyStyle={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Login 
          closeModal={() => setLoginModalVisible(false)} 
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
}

export default Models;