import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Register = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    const { fullName, email, password } = values;
    setLoading(true);

    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile & Firestore
      await updateProfile(user, { displayName: fullName });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        createdAt: serverTimestamp(),
      });

      message.success("Registration successful!");
      closeModal(); // Close modal after successful registration
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>Sign Up</Title>

      <Form layout="vertical" onFinish={handleRegister} style={styles.form}>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email Address" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, min: 6, message: "Password must be at least 6 characters" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} style={styles.button} block>
          Sign Up
        </Button>

        {/* <Text style={styles.loginText}>
          Already have an account? <a href="#" style={styles.loginLink}>Login</a>
        </Text> */}
      </Form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    width: "100%",
  },
  button: {
    backgroundColor: "#fa4226",
    color: "#fff",
    height: "40px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  loginText: {
    display: "block",
    marginTop: "10px",
  },
  loginLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default Register;
