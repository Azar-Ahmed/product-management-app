import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Carousel, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import {
  fetchFilteredProducts,
  setSelectedCategory,
} from '../redux/slices/productSlice';

const carouselItems = [
  {
    image: 'https://media.istockphoto.com/id/1338894509/photo/woman-choosing-a-new-style-for-herself.jpg?b=1&s=612x612&w=0&k=20&c=dZlTyK-c2DrUNbLzGLKnoGm1dxsdfr9x2dea08fqiF8=',
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1713483863683-2441bd9723c0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbiUyMGJyYW5kfGVufDB8fDB8fHww',
  },
];

const categories = ['All', 'Shirts', 'T-shirts', 'Jeans', 'Dresses', 'Footwear'];

function Home() {
  const dispatch = useDispatch();
  const { filteredProducts, status } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategoryState] = useState('All');

  useEffect(() => {
    dispatch(fetchFilteredProducts());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategoryState(category);

    // Update Redux filter state
    if (category === 'All') {
      dispatch(setSelectedCategory([])); // Clear filter
    } else {
      dispatch(setSelectedCategory([category])); // Set single category
    }

    dispatch(fetchFilteredProducts()); // Trigger filter effect
  };

  return (
    <Container fluid>
      <Carousel className="mb-4">
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`Slide ${index + 1}`}
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex flex-wrap justify-content-center mb-4 gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'dark' : 'outline-dark'}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {status === 'loading' ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <ProductCard products={filteredProducts} />
      )}
    </Container>
  );
}

export default Home;
