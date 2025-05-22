import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    dispatch(registerUser(data));
  };

  // Show toast on error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Show success toast and redirect on registration success
  useEffect(() => {
    if (user) {
      toast.success("Registration successful!");
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4">Register</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProfileImage" className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            name="profileImage"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Register"}
        </Button>
      </Form>

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
}

export default Register;
