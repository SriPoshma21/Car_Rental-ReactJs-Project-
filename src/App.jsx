
// import "../src/dist/styles.css";
// import { Route, Routes, useLocation } from "react-router-dom";
// import About from "./Pages/About";
// import Home from "./Pages/Home";
// import Navbar from "./components/Navbar";
// import Models from "./Pages/Models";
// import TestimonialsPage from "./Pages/TestimonialsPage";
// import Team from "./Pages/Team";
// import Contact from "./Pages/Contact";
// import BookRide from "./Pages/BookRide";
// import CheckoutPage from "./Pages/CheckoutPage";
// import CheckoutForm from "./Pages/CheckoutForm";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Profile from "./Pages/Profile";
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentPage from "./Pages/PaymentPage";

// // ✅ Load Stripe
// const stripePromise = loadStripe("pk_test_51R9LK6PV1vZmFxw3VvnVxbMr3AA956LfW0jGF3CpeDXoxU4v2c7NxYzkYZY26gr96PHpx2xcfE6mamFRam2P2SA600zpcNb534");

// function App() {
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const hideNavbarRoutes = ["/book-ride"];

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       {!hideNavbarRoutes.includes(location.pathname) && <Navbar user={user} />}
//       <Routes>
//         <Route index path="/" element={<Home user={user} />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="models" element={<Models />} />
//         <Route path="testimonials" element={<TestimonialsPage />} />
//         <Route path="team" element={<Team />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="book-ride/:carId" element={<BookRide />} />
//         <Route path="checkout" element={<CheckoutPage />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="payment-page" element={<PaymentPage />} /> 
//         {/* ✅ Wrapped CheckoutForm inside <Elements> for Stripe */}
//         <Route
//           path="checkout-form"
//           element={
//             <Elements stripe={stripePromise}>
//               <CheckoutForm />
//             </Elements>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
import "../src/dist/styles.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import BookRide from "./Pages/BookRide";
import CheckoutPage from "./Pages/CheckoutPage";
import CheckoutForm from "./Pages/CheckoutForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./Pages/Profile";
import PaymentPage from "./Pages/PaymentPage";
import PaymentSuccess from "./Pages/PaymentSuccess";  // ✅ Import Success Page
import PaymentFailure from "./Pages/PaymentFailure";  // ✅ Import Failure Page

import { auth } from "./firebase";
import Bookings from "./Pages/Bookings";

// ✅ Load Stripe
const stripePromise = loadStripe("pk_test_51R9LK6PV1vZmFxw3VvnVxbMr3AA956LfW0jGF3CpeDXoxU4v2c7NxYzkYZY26gr96PHpx2xcfE6mamFRam2P2SA600zpcNb534");

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* ✅ Navbar is now always visible */}
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/models" element={<Models />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-ride/:carId" element={<BookRide />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-page" element={<PaymentPage />} />

        {/* ✅ Wrap CheckoutPage & CheckoutForm inside Stripe Elements */}
        <Route path="/checkout" element={
          <Elements stripe={stripePromise}>
            <CheckoutPage />
          </Elements>
        } />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/checkout-form" element={
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        } />

        {/* ✅ Payment Success & Failure Routes */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
      </Routes>
    </>
  );
}

export default App;
