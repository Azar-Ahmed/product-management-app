import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/slices/authSlice';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Spinner,
} from 'react-bootstrap';

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const { user, loading } = useSelector((state) => state.auth);
  const userData = user || {};

  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    phone: userData.phone || '',
    profileImage: userData.profileImage || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('email', formData.email);
    updatedData.append('phone', formData.phone);
    if (selectedFile) {
      updatedData.append('profileImage', selectedFile);
    }

    await dispatch(updateUser(updatedData));
    setIsEditing(false);
  };

  return (
    <div
      className="py-5"
      style={{
        // background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        minHeight: '100vh',
      }}
    >
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg rounded-4">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <Image
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : formData.profileImage || '/default-avatar.png'
                    }
                    roundedCircle
                    width={120}
                    height={120}
                    className="border border-3"
                    style={{ objectFit: 'cover' }}
                    alt="Profile"
                  />
                  {isEditing && (
                    <div className="mt-2">
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </div>
                  )}
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant={isEditing ? 'secondary' : 'dark'}
                      onClick={handleEditToggle}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>

                    {isEditing && (
                      <Button type="submit" variant="dark" disabled={loading}>
                        {loading ? <Spinner size="sm" /> : 'Update'}
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
