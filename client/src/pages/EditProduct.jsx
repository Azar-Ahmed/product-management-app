import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct, clearProduct } from '../features/product/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.products);

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

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name || '',
        desc: product.desc || '',
        mrp: product.mrp || '',
        salesPrice: product.salesPrice || '',
        colors: product.colors || '',
        ratings: product.ratings || '',
        product_type: product.product_type || '',
        categories: product.categories || '',
        brands: product.brands || '',
        image: product.image || '',
      });
    }
  }, [product]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('image', file);
    setUploading(true);

    try {
      const res = await axios.post('/api/upload', data);
      setFormData({ ...formData, image: res.data.url });
    } catch (error) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData: formData })).then(() => {
      navigate('/products');
    });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {loading && <Spinner animation="border" />}

      {!loading && (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="product_name" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.product_name}
              onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="desc" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="mrp" className="mb-3">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="number"
              value={formData.mrp}
              onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="salesPrice" className="mb-3">
            <Form.Label>Sales Price</Form.Label>
            <Form.Control
              type="number"
              value={formData.salesPrice}
              onChange={(e) => setFormData({ ...formData, salesPrice: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="colors" className="mb-3">
            <Form.Label>Colors (comma separated)</Form.Label>
            <Form.Control
              type="text"
              value={formData.colors}
              onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="ratings" className="mb-3">
            <Form.Label>Ratings</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.ratings}
              onChange={(e) => setFormData({ ...formData, ratings: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="product_type" className="mb-3">
            <Form.Label>Product Type</Form.Label>
            <Form.Select
              value={formData.product_type}
              onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
              required
            >
              <option value="">Select Type</option>
              <option value="Mens">Mens</option>
              <option value="Womans">Womans</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
              <option value="Baby">Baby</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="categories" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={formData.categories}
              onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="Shirts">Shirts</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Dresses">Dresses</option>
              <option value="Shoes">Shoes</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="brands" className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Select
              value={formData.brands}
              onChange={(e) => setFormData({ ...formData, brands: e.target.value })}
              required
            >
              <option value="">Select Brand</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" value={formData.image} readOnly />
            <Form.Control type="file" onChange={uploadImageHandler} />
            {uploading && <Spinner animation="border" size="sm" />}
          </Form.Group>

          <Button type="submit" disabled={loading || uploading}>
            Update Product
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditProduct;
