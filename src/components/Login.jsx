import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { Form, Input, Button, Typography, message } from "antd";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login = ({ closeModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      localStorage.setItem("user", values.email); // ✅ Save user email
      alert("Login successful!");
      closeModal && closeModal();
      navigate("/Home");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, "anonymous@gmail.com", "guest123");
      localStorage.setItem("user", "Guest"); // ✅ Save "Guest"
      alert("Login successful!");
      closeModal && closeModal();
      navigate("/Home");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", result.user.email); // ✅ Save Google email
      message.success(`Welcome ${result.user.displayName}!`);
      closeModal && closeModal();
      navigate("/app-interface");
    } catch (error) {
      message.error("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", backgroundColor: "#f0f2f5" }}>
      <div style={{ width: 350, padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <Title level={3} style={{ textAlign: "center" }}>Login</Title>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Enter a valid email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required" }, { min: 6, message: "Password must be at least 6 characters" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} style={{ backgroundColor: "#2E7D32", borderColor: "#2E7D32" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Button
          block
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          style={{ backgroundColor: "#D32F2F", borderColor: "#D32F2F", color: "white", marginBottom: 10 }}
        >
          Continue with Google
        </Button>
        <Button
          block
          onClick={handleGuestLogin}
          style={{ backgroundColor: "#1565C0", borderColor: "#1565C0", color: "white" }}
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
};

export default Login;
