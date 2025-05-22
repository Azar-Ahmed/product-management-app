import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFilteredProducts,
  setSelectedCategory,
  setPriceRange,
  setSelectedProductType,
  setSortOption,
  setCurrentPage,
} from '../redux/slices/productSlice';

import ProductFilter from '../components/ProductFilter';
import ProductCart from '../components/ProductCard';

const categories = ['Shirts', 'T-shirts', 'Jeans', 'Dresses', 'Footwear'];
const product_type = ['Mens', 'Womans', 'Boy', 'Girl', 'Baby'];

function ProductList() {
  const dispatch = useDispatch();
  const {
    filteredProducts,
    selectedCategory,
    selectedAuthor,
    priceRange,
    selectedProductType,
    sortOption,
    status,
    currentPage,
    totalPages,
  } = useSelector((state) => state.products);

  // Trigger API fetch when filters or page changes
  useEffect(() => {
    dispatch(fetchFilteredProducts());
  }, [
    dispatch,
    selectedCategory,
    selectedAuthor,
    priceRange,
    selectedProductType,
    sortOption,
    currentPage,
  ]);

  const handleSortChange = (e) => {
    dispatch(setSortOption(e.target.value));
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else if (direction === 'next' && currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3}>
          <ProductFilter
            categories={categories}
            product_type={product_type}
            selectedCategory={selectedCategory}
            setSelectedCategory={(val) => dispatch(setSelectedCategory(val))}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={(val) => dispatch(setSelectedAuthor(val))}
            priceRange={priceRange}
            setPriceRange={(val) => dispatch(setPriceRange(val))}
            selectedProductType={selectedProductType}
            setSelectedProductType={(val) =>
              dispatch(setSelectedProductType(val))
            }
          />
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3>Showing {filteredProducts.length} results</h3>
            <div>
              <label htmlFor="sortPrice" className="mr-2">
                Sort by Price:
              </label>
              <select
                id="sortPrice"
                className="form-select"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
          <hr />
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'failed' ? (
            <p>Failed to load products.</p>
          ) : (
            <>
              <ProductCart products={filteredProducts} />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductList;
