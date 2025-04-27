import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal, Button, Dropdown } from "antd";
import { FaUser, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from "../images/logo/logo.png";
import Login from "../components/Login";
import Register from "../components/Register";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../styles/NavbarStyles/Navbar.scss"	

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // const items = [
  //   {
  //     key: 'profile',
  //     label: <Link to="/profile" onClick={closeMenu}>Profile</Link>,
  //   },
  //   {
  //     key: 'logout',
  //     label: <span onClick={handleLogout}>Logout</span>,
  //   },
  // ];
  const items = [
    {
      key: 'profile',
      label: <Link to="/profile" onClick={closeMenu}>Profile</Link>,
    },
    // {
    //   key: 'bookings',
    //   label: <Link to="/bookings" onClick={closeMenu}>Bookings</Link>,
    // },
    {
      key: 'logout',
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar__img">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src={Logo} alt="logo-img" style={{width:"10em",height:"7vh"}} />
          </Link>
        </div>

        <button className="navbar__toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar__links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/models" onClick={closeMenu}>
              Vehicle Models
            </Link>
          </li>
          <li>
            <Link to="/testimonials" onClick={closeMenu}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/team" onClick={closeMenu}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>

        <div className={`navbar__buttons ${isMenuOpen ? "active" : ""}`}>
          {user ? (
            <>
              {/* Desktop Dropdown */}
              <div className="desktop-view">
                <Dropdown menu={{ items }} trigger={['click']}>
                  <Button className="navbar__buttons__profile">
                    <FaUser /> 
                    {user?.displayName || (user?.email ? user.email.split("@")[0] : "User")}
                    <FaChevronDown style={{ marginLeft: '5px', fontSize: '0.8rem' }} />
                  </Button>
                </Dropdown>
              </div>

              {/* Mobile Dropdown */}
              <div className="mobile-view">
                <div className="mobile-dropdown">
                  <Button className="navbar__buttons__profile" block>
                    <FaUser /> 
                    {user?.displayName || (user?.email ? user.email.split("@")[0] : "User")}
                  </Button>
                  {/* <div className="mobile-dropdown-content">
                    <Link to="/profile" onClick={closeMenu} className="mobile-dropdown-item">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="mobile-dropdown-item">
                      Logout
                    </button>
                  </div> */}
                  <div className="mobile-dropdown-content">
  <Link to="/profile" onClick={closeMenu} className="mobile-dropdown-item">
    Profile
  </Link>
  {/* <Link to="/bookings" onClick={closeMenu} className="mobile-dropdown-item">
    Bookings
  </Link> */}
  <button onClick={handleLogout} className="mobile-dropdown-item">
    Logout
  </button>
</div>

                </div>
              </div>
            </>
          ) : (
            <Button
              className="navbar__buttons__login"
              onClick={() => {
                setIsModalVisible(true);
                closeMenu();
              }}
            >
              <FaUser /> Login
            </Button>
          )}
        </div>
      </nav>

      <Modal
        // title={showLogin ? "Login" : "Register"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={400}
        destroyOnClose
      >
        {showLogin ? <Login /> : <Register />}
        <div className="auth-toggle">
          {showLogin ? (
            <p>
              Don't have an account?{" "}
              <Button type="link" onClick={() => setShowLogin(false)}>
                Register
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Button type="link" onClick={() => setShowLogin(true)}>
                Login
              </Button>
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Navbar;