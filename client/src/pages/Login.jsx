import React, { useState, useEffect } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Show toast for errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate("/");
      toast.success("Login successful!");
    }
  }, [user, navigate]);

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4">Login</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
}

export default Login;
