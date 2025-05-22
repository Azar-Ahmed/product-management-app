import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCart = ({ products }) => {
  return (
    <Row>
      {products.length === 0 ? (
        <Col>
          <p>No products found.</p>
        </Col>
      ) : (
        products.map((product) => (
          <Col md={3} key={product._id} className="mb-4">
            <Card>
              <Card.Img
                className="product-image"
                variant="top"
                src={product.image}
              />
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/product/${product._id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {product.product_name}
                  </Link>
                </Card.Title>
                <Card.Text>
                  <strong>Brand:</strong> {product.brands}
                </Card.Text>
                <Card.Text>
                  <strong>Price: ₹{product.salesPrice}</strong>{' '}
                  <del>₹{product.mrp}</del>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  )
}

export default ProductCart
