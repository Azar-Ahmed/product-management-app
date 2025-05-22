import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_name: "",
    desc: "",
    mrp: "",
    salesPrice: "",
    colors: "",
    product_type: "",
    categories: "",
    brands: "",
    totalStock: "",
    image: null,
  });

  const { addProductStatus, addProductError } = useSelector(
    (state) => state.products
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image validation
    if (form.image) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(form.image.type)) {
        toast.error("Only JPG, PNG, or WEBP images are allowed.");
        return;
      }
      if (form.image.size > 2 * 1024 * 1024) {
        toast.error("Image size must be under 2MB.");
        return;
      }
    }

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    const resultAction = await dispatch(addProduct(formData));

    if (addProduct.fulfilled.match(resultAction)) {
      toast.success("Product added successfully!");
      setForm({
        product_name: "",
        desc: "",
        mrp: "",
        salesPrice: "",
        colors: "",
        product_type: "",
        categories: "",
        brands: "",
        totalStock: "",
        image: null,
      });
      navigate("/admin/products");
    } else {
      toast.error("Failed to add product.");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <h3>Add New Product</h3>

      {addProductError && <Alert variant="danger">{addProductError}</Alert>}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="desc"
            rows={3}
            value={form.desc}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>MRP</Form.Label>
          <Form.Control
            type="number"
            name="mrp"
            value={form.mrp}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sales Price</Form.Label>
          <Form.Control
            type="number"
            name="salesPrice"
            value={form.salesPrice}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Colors</Form.Label>
          <Form.Control
            type="text"
            name="colors"
            value={form.colors}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Type</Form.Label>
          <Form.Select
            name="product_type"
            value={form.product_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option>Mens</option>
            <option>Womans</option>
            <option>Boy</option>
            <option>Girl</option>
            <option>Baby</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="categories"
            value={form.categories}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option>Shirts</option>
            <option>T-shirts</option>
            <option>Jeans</option>
            <option>Dresses</option>
            <option>Footwear</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brands"
            value={form.brands}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Stock</Form.Label>
          <Form.Control
            type="number"
            name="totalStock"
            value={form.totalStock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={addProductStatus === "loading"}
        >
          {addProductStatus === "loading" ? (
            <>
              <Spinner animation="border" size="sm" /> Uploading...
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </Form>

      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
}

export default AddProduct;
