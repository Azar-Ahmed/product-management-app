import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use `user` state from userSlice, not `auth`
  const { loading, error, user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  // Removed clearError dispatch because no reducer for that exists in userSlice
  // You can add clearError if you want in the slice

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('image', file);
    setUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      setFormData((prev) => ({ ...prev, profileImage: json.url }));
    } catch {
      alert('Image upload failed');
    }
    setUploading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    dispatch(registerUser(formData));
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="mobile" className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="profileImage" className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" onChange={uploadImageHandler} />
          {uploading && <Spinner animation="border" size="sm" />}
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile"
              style={{ marginTop: '10px', maxWidth: '150px' }}
            />
          )}
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
