
// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Typography, Spin } from "antd";
// import { auth } from "../firebase"; // Import Firebase authentication

// const { Title, Text } = Typography;

// function Bookings() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get the logged-in user's UID
//   const getCurrentUserId = () => {
//     const user = auth.currentUser; // Firebase auth provides the current logged-in user
//     return user ? user.uid : null;
//   };

//   const userId = getCurrentUserId();

//   useEffect(() => {
//     fetch("https://car-rentals-json-server.onrender.com/api/cars")
//       .then((res) => res.json())
//       .then((data) => {
//         setCars(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch cars", err);
//         setLoading(false);
//       });
//   }, []);

//   // Filter bookings for the logged-in user
//   const userBookings = cars.flatMap(car => car.bookings || []).filter(booking => booking.userId === userId);

//   if (loading) {
//     return (
//       <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <Title level={2} style={{ textAlign: "center" }}>Your Bookings</Title>
//       {userBookings.length === 0 ? (
//         <Text>No bookings found.</Text>
//       ) : (
//         <Row gutter={[24, 24]}>
//           {userBookings.map((booking, index) => (
//             <Col key={index} xs={24} sm={12} md={8}>
//               <Card title={`Booking ${index + 1}`} bordered={false}>
//                 <Text strong>Pickup Location:</Text> {booking.pickupLocation}<br />
//                 <Text strong>Drop Location:</Text> {booking.dropLocation}<br />
//                 <Text strong>Pickup Time:</Text> {booking.pickupTime}<br />
//                 <Text strong>Dates:</Text> {booking.startDate} to {booking.endDate}<br />
//                 <Text strong>Total Cost:</Text> ₹{booking.totalCost}<br />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// }

// export default Bookings;

