import React from "react";
import { Row, Col, Card } from "antd";
import Img2 from "../images/testimonials/pfp1.jpg";
import Img3 from "../images/testimonials/pfp2.jpg";
import { FaQuoteRight } from "react-icons/fa";

function Testimonials() {
  return (
    <section
      style={{
        padding: "50px 20px",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Title Section */}
        <div style={{ marginBottom: "40px" }}>
          <h4 style={{ fontSize: "18px", color: "#666" }}>Reviewed by People</h4>
          <h2 style={{ fontSize: "32px", color: "#333", margin: "10px 0" }}>
            Client's Testimonials
          </h2>
          <p style={{ fontSize: "16px", color: "#777", maxWidth: "600px", margin: "0 auto" }}>
            Discover the positive impact we've made on our clients by reading
            through their testimonials. Our clients have experienced our service
            and results, and they're eager to share their positive experiences
            with you.
          </p>
        </div>

        {/* Testimonials Grid */}
        <Row gutter={[24, 24]} justify="center">
          {/* Testimonial 1 */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Card
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                textAlign: "left",
              }}
            >
              <div style={{ position: "relative" }}>
                <FaQuoteRight
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    fontSize: "24px",
                    color: "#ff4d4f",
                  }}
                />
                <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
                  "We rented a car from this website and had an amazing
                  experience! The booking was easy and the rental rates were
                  very affordable."
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={Img2}
                    alt="user_img"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: "18px", color: "#333", margin: "0" }}>
                      Parry Hotter
                    </h4>
                    <p style={{ fontSize: "14px", color: "#777", margin: "0" }}>
                      Belgrade
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Testimonial 2 */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Card
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                textAlign: "left",
              }}
            >
              <div style={{ position: "relative" }}>
                <FaQuoteRight
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    fontSize: "24px",
                    color: "#ff4d4f",
                  }}
                />
                <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
                  "The car was in great condition and made our trip even better.
                  Highly recommend for this car rental website!"
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={Img3}
                    alt="user_img"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: "18px", color: "#333", margin: "0" }}>
                      Ron Rizzly
                    </h4>
                    <p style={{ fontSize: "14px", color: "#777", margin: "0" }}>
                      Novi Sad
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Testimonials;
