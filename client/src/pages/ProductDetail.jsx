import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetails, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Loading product...</p>
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error || 'Failed to load product.'}</Alert>
      </Container>
    );
  }

  if (!productDetails) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">No product found.</Alert>
      </Container>
    );
  }

  const product = productDetails;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={5}>
          <Image
            src={product.image}
            alt={product.product_name}
            fluid
            style={{ objectFit: 'contain', maxHeight: '500px', width: '100%' }}
          />
        </Col>

        <Col md={7}>
          <Card className="p-4 shadow-sm">
            <Card.Title as="h3">{product.product_name}</Card.Title>
            <Card.Text className="mt-3">
              <strong>Description:</strong>
              <br />
              {product.desc}
            </Card.Text>
            <Card.Text>
              <strong>Category:</strong> {product.categories || 'N/A'}
            </Card.Text>
            <Card.Text>
              <strong>Product Type:</strong> {product.product_type || 'N/A'}
            </Card.Text>
            <Card.Text>
              <strong>Brand:</strong> {product.brands || 'N/A'}
            </Card.Text>
             <Card.Text>
              <strong>Color:</strong> {product.colors || 'N/A'}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong>{' '}
              <del className="text-muted">₹{product.mrp}</del>{' '}
              <span className="text-success">₹{product.salesPrice}</span>
            </Card.Text>
            <Card.Text>
              <strong>Stock:</strong>{' '}
              {product.totalStock > 0 ? (
                <span className="text-success">{product.totalStock} available</span>
              ) : (
                <span className="text-danger">Out of stock</span>
              )}
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
