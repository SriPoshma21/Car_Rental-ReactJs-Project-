import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Spin,
  Input,
  Row,
  Col,
  Divider,
  Upload,
  Select,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EditOutlined,
  CalendarOutlined,
  SaveOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "../styles/profile.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
            setUpdatedData(userSnap.data());
          } else {
            console.log("No user data found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData({
          fullName: "Guest",
          email: "anonymous@gmail.com",
          phone: "9876543210",
          gender: "Male",
          dob: "2000-01-01",
          createdAt: { seconds: 1743363820 },
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEdit = () => setEditMode(true);

  const handleChange = (e, field) => {
    setUpdatedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, updatedData);
      setUserData(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) return <Spin size="large" className="loading-spinner" />;

  return (
    <div className="profile-page-container">
      <Card className="profile-header-card">
        <div className="avatar-upload-wrapper">
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                setUpdatedData((prev) => ({ ...prev, avatarUrl: e.target.result }));
                setUserData((prev) => ({ ...prev, avatarUrl: e.target.result }));
              };
              reader.readAsDataURL(file);
              return false;
            }}
          >
            <div className="avatar-container">
              <Avatar
                size={100}
                icon={<UserOutlined />}
                src={userData?.avatarUrl}
                className="avatar"
              />
              <div className="edit-icon">
                <CameraOutlined />
              </div>
            </div>
          </Upload>
        </div>
        <Title level={3} className="profile-title">
          {userData?.fullName}
        </Title>
      </Card>

      <Row gutter={[24, 24]} className="profile-details-row">
        {/* Personal Info */}
        <Col xs={24} md={8}>
          <Card title="Personal Info" bordered={false} className="card-section">
            <Text>
              <IdcardOutlined /> <strong>Name:</strong>
            </Text>
            {editMode ? (
              <Input
                value={updatedData.fullName}
                onChange={(e) => handleChange(e, "fullName")}
              />
            ) : (
              <Text> {userData?.fullName}</Text>
            )}
            <Divider />

            <Text>
              <UserOutlined /> <strong>Gender:</strong>
            </Text>
            {editMode ? (
              <Select
                value={updatedData.gender}
                onChange={(value) =>
                  setUpdatedData((prev) => ({ ...prev, gender: value }))
                }
                style={{ width: "100%" }}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            ) : (
              <Text> {userData?.gender}</Text>
            )}
            <Divider />

            <Text>
              <CalendarOutlined /> <strong>DOB:</strong>
            </Text>
            {editMode ? (
              <DatePicker
                value={updatedData.dob ? dayjs(updatedData.dob) : null}
                onChange={(date, dateString) =>
                  setUpdatedData((prev) => ({ ...prev, dob: dateString }))
                }
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
            ) : (
              <Text> {userData?.dob}</Text>
            )}
          </Card>
        </Col>

        {/* Contact Info */}
        <Col xs={24} md={8}>
          <Card title="Contact Info" bordered={false} className="card-section">
            <Text>
              <PhoneOutlined /> <strong>Phone:</strong>
            </Text>
            {editMode ? (
              <Input
                value={updatedData.phone}
                onChange={(e) => handleChange(e, "phone")}
              />
            ) : (
              <Text> {userData?.phone}</Text>
            )}
            <Divider />

            <Text>
              <MailOutlined /> <strong>Email:</strong> {userData?.email}
            </Text>
          </Card>
        </Col>

        {/* Account Info */}
        <Col xs={24} md={8}>
          <Card title="Account Info" bordered={false} className="card-section">
            <Text>
              <strong>Account Created:</strong>
            </Text>
            <Text>
              {userData?.createdAt?.seconds
                ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString()
                : "Unknown"}
            </Text>
            <Divider />
          </Card>
        </Col>
      </Row>

      <Row justify="center" className="action-buttons-row">
        <Col>
          {editMode ? (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
