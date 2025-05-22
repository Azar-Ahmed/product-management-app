import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  updateProduct,
} from "../redux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    productDetails,
    status,
    error,
    updateProductStatus,
    updateProductError,
  } = useSelector((state) => state.products);

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

  // Fetch product details
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Populate form once product is fetched
  useEffect(() => {
    if (productDetails) {
      setForm({
        product_name: productDetails.product_name || "",
        desc: productDetails.desc || "",
        mrp: productDetails.mrp || "",
        salesPrice: productDetails.salesPrice || "",
        colors: productDetails.colors || "",
        product_type: productDetails.product_type || "",
        categories: productDetails.categories || "",
        brands: productDetails.brands || "",
        totalStock: productDetails.totalStock || "",
        image: null,
      });
    }
  }, [productDetails]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    const result = await dispatch(updateProduct({ id, updatedData: formData }));

    if (updateProduct.fulfilled.match(result)) {
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } else {
      toast.error(updateProductError || "Failed to update product.");
    }
  };

  if (status === "loading") return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <h3>Edit Product</h3>
      {error && <Alert variant="danger">{error}</Alert>}

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
            value={form.desc}
            onChange={handleChange}
            rows={3}
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
            <option value="">Select</option>
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
            <option value="">Select</option>
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
          <Form.Label>Replace Image (optional)</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={updateProductStatus === "loading"}
        >
          {updateProductStatus === "loading" ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Update Product"
          )}
        </Button>
      </Form>

      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
}

export default EditProduct;
