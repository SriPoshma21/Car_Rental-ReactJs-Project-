// import Hero from "../components/Hero";
// // import BookCar from "../components/BookCar";
// import PlanTrip from "../components/PlanTrip";
// // import PickCar from "../components/PickCar";
// import Banner from "../components/Banner";
// import ChooseUs from "../components/ChooseUs";
// import Testimonials from "../components/Testimonials";
// import Faq from "../components/Faq";
// import Download from "../components/Download";
// import Footer from "../components/Footer";


// function Home() {
//   return (
//     <>
//       <Hero />
//       {/* <BookCar /> */}
//       <PlanTrip />
//       {/* <PickCar /> */}
//       <Banner />
//       <ChooseUs />
//       <Testimonials />
//       <Faq />
//       <Download />
//       <Footer />
//     </>
//   );
// }

// export default Home;
import Hero from "../components/Hero";
import PlanTrip from "../components/PlanTrip";
import Banner from "../components/Banner";
import ChooseUs from "../components/ChooseUs";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Download from "../components/Download";
import Footer from "../components/Footer";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

function Home({ user }) {
  return (
    <>
      <Hero>
        <div className="hero-content">
        <Title level={1} className="hero-title" style={{ color: "#fff" }}>
  {user ? `Welcome back, ${user?.displayName || user?.email?.split("@")[0]}` : "Premium Car Rental Service"}
</Title>

          <p className="hero-subtitle" style={{ color: '#fff', fontSize: '18px' }}>
            {user ? "Ready for your next adventure?" : "Find the perfect vehicle for your journey"}
          </p>
          <div className="hero-buttons">
            <Button 
              type="primary" 
              size="large" 
              style={{ 
                backgroundColor: '#fa4226', 
                borderColor: '#fa4226',
                marginRight: user ? 0 : '16px'
              }}
            >
              <Link to="/models" style={{ color: 'white' }}>
                {user ? "Book Your Next Ride" : "Browse Vehicles"}
              </Link>
            </Button>
            {!user && (
              <Button 
                size="large" 
                style={{ 
                  borderColor: '#fa4226', 
                  color: '#fa4226',
                  backgroundColor: 'transparent'
                }}
              >
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </Hero>

      <PlanTrip />
      <Banner />
      <ChooseUs />
      <Testimonials />
      <Faq />
      <Download />
      <Footer />
    </>
  );
}

export default Home;