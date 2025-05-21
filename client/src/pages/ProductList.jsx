import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Pagination,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error, pages } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    product_type: '',
    search: '',
    sort: '',
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handlePageChange = (pageNum) => {
    setFilters({ ...filters, page: pageNum });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this product?')) {
      dispatch(deleteProduct(id)).then(() => {
        dispatch(fetchProducts(filters));
      });
    }
  };

  return (
    <div>
      <h2>Product List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-3">
        <Col md={3}>
          <Form.Select
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value, page: 1 })}
          >
            <option value="">All Brands</option>
            <option>Nike</option>
            <option>Adidas</option>
            <option>Puma</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
          >
            <option value="">All Categories</option>
            <option>Shirts</option>
            <option>T-shirts</option>
            <option>Jeans</option>
            <option>Dresses</option>
            <option>Shoes</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={filters.product_type}
            onChange={(e) => setFilters({ ...filters, product_type: e.target.value, page: 1 })}
          >
            <option value="">All Types</option>
            <option>Mens</option>
            <option>Womans</option>
            <option>Boy</option>
            <option>Girl</option>
            <option>Baby</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
          >
            <option value="">Sort</option>
            <option value="price_asc">Price Low to High</option>
            <option value="price_desc">Price High to Low</option>
          </Form.Select>
        </Col>
      </Row>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
        />
      </InputGroup>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {products.map((p) => (
            <Col md={4} key={p._id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={p.image} />
                <Card.Body>
                  <Card.Title>{p.product_name}</Card.Title>
                  <Card.Text>{p.desc}</Card.Text>
                  <Card.Text>
                    <strong>₹{p.salesPrice}</strong>{' '}
                    <span className="text-muted text-decoration-line-through">₹{p.mrp}</span>
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => navigate(`/products/edit/${p._id}`)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(p._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === filters.page}
            onClick={() => handlePageChange(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default ProductList;
