import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(state => state.products);

  const [formData, setFormData] = useState({
    product_name: '',
    desc: '',
    mrp: '',
    salesPrice: '',
    colors: '',
    ratings: '',
    product_type: '',
    categories: '',
    brands: '',
    image: '',
  });

  const [uploading, setUploading] = useState(false);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('image', file);
    setUploading(true);

    try {
      const res = await axios.post('/api/upload', data);
      setFormData({ ...formData, image: res.data.url });
    } catch {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData)).then(() => {
      navigate('/products');
    });
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        {/* Same form controls */}
        {/* ... */}
        <Button type="submit" disabled={loading || uploading} className="mt-2">
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
