import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedCategory,
  setPriceRange,
  setSelectedProductType,
  fetchFilteredProducts,
  setSearchKeyword,
} from '../redux/slices/productSlice';

const ProductFilter = () => {
  const dispatch = useDispatch();

  const {
    selectedCategory,
    priceRange,
    selectedProductType,
    searchKeyword,
  } = useSelector((state) => state.products);

  const [localSearch, setLocalSearch] = useState(searchKeyword || '');

  const categories = ['Shirts', 'T-shirts', 'Jeans', 'Dresses', 'Footwear'];
  const productTypes = ['Mens', 'Womans', 'Boy', 'Girl', 'Baby'];
  const priceOptions = ['0-1000', '1000-2000', '2000-3000', '3000+'];

  // Debounce search input to avoid too many dispatches
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchKeyword(localSearch));
      dispatch(fetchFilteredProducts());
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    dispatch(setSelectedCategory(value === 'All' ? [] : [value]));
    dispatch(fetchFilteredProducts());
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.value;
    dispatch(setSelectedProductType(value === 'All' ? [] : [value]));
    dispatch(fetchFilteredProducts());
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;

    if (value === 'All') {
      dispatch(setPriceRange([]));
    } else {
      let min = 0;
      let max = Infinity;

      if (value.includes('+')) {
        min = parseInt(value.replace('+', ''), 10);
        max = Infinity;
      } else if (value.includes('-')) {
        const [minStr, maxStr] = value.split('-');
        min = parseInt(minStr, 10);
        max = parseInt(maxStr, 10);
      }

      dispatch(setPriceRange([min, max]));
    }

    dispatch(fetchFilteredProducts());
  };

  return (
    <div className="border p-3 shadow-sm rounded">
      <h4>Filters</h4>
      <hr />

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <h5>Category</h5>
      <div className="form-check">
        <input
          type="radio"
          name="category"
          className="form-check-input"
          id="categoryAll"
          value="All"
          checked={selectedCategory.length === 0}
          onChange={handleCategoryChange}
        />
        <label className="form-check-label" htmlFor="categoryAll">
          All
        </label>
      </div>
      {categories.map((category) => (
        <div key={category} className="form-check">
          <input
            type="radio"
            name="category"
            className="form-check-input"
            id={category}
            value={category}
            checked={selectedCategory[0] === category}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label" htmlFor={category}>
            {category}
          </label>
        </div>
      ))}

      <hr />

      {/* Product Type */}
      <h5>Product Type</h5>
      <div className="form-check">
        <input
          type="radio"
          name="productType"
          className="form-check-input"
          id="typeAll"
          value="All"
          checked={selectedProductType.length === 0}
          onChange={handleProductTypeChange}
        />
        <label className="form-check-label" htmlFor="typeAll">
          All
        </label>
      </div>
      {productTypes.map((type) => (
        <div key={type} className="form-check">
          <input
            type="radio"
            name="productType"
            className="form-check-input"
            id={type}
            value={type}
            checked={selectedProductType[0] === type}
            onChange={handleProductTypeChange}
          />
          <label className="form-check-label" htmlFor={type}>
            {type}
          </label>
        </div>
      ))}

      <hr />

      {/* Price */}
      <h5>Price</h5>
      <div className="form-check">
        <input
          type="radio"
          name="priceRange"
          className="form-check-input"
          id="priceAll"
          value="All"
          checked={priceRange.length === 0}
          onChange={handlePriceRangeChange}
        />
        <label className="form-check-label" htmlFor="priceAll">
          All
        </label>
      </div>
      {priceOptions.map((range, index) => (
        <div key={range} className="form-check">
          <input
            type="radio"
            name="priceRange"
            className="form-check-input"
            id={`price${index}`}
            value={range}
            checked={
              priceRange.length > 0 &&
              (priceRange[1] === Infinity
                ? `${priceRange[0]}+` === range
                : `${priceRange[0]}-${priceRange[1]}` === range)
            }
            onChange={handlePriceRangeChange}
          />
          <label className="form-check-label" htmlFor={`price${index}`}>
            {range === '3000+' ? '₹3000+' : `₹${range.replace('-', ' - ₹')}`}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProductFilter;
