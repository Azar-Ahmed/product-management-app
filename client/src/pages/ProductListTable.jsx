import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, deleteProduct  } from "../redux/slices/productSlice";
import { Button, Spinner, Alert } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const customStyles = {
  rows: {
    style: {
      fontSize: "16px", // Change this value to increase/decrease
    },
  },
  headCells: {
    style: {
      fontSize: "17px",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
    },
  },
};


const ProductListTablePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, allProductsStatus, allProductsError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

 const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        alert("Product deleted successfully!");
        dispatch(fetchAllProducts());  // Refetch updated product list
      })
      .catch((error) => {
        alert("Delete failed: " + error);
        console.error("Delete error:", error);
      });
  }
};
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Image",
      cell: (row) => <img src={row.image} alt={row.product_name} width={60} />,
      sortable: false,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "MRP",
      selector: (row) => row.mrp,
      sortable: true,
    },
    {
      name: "Sales Price",
      selector: (row) => row.salesPrice,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.categories,
    },
    {
      name: "Brand",
      selector: (row) => row.brands,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button variant="warning" className="me-2" onClick={() => handleEdit(row._id)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>All Products</h3>
        <Button variant="dark" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {allProductsStatus === "loading" ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : allProductsError ? (
        <Alert variant="danger">{allProductsError}</Alert>
      ) : (
        <DataTable
          columns={columns}
          data={items}
          pagination
          highlightOnHover
          striped
          responsive
           customStyles={customStyles} 
          defaultSortFieldId={3}
        />
      )}
    </div>
  );
};

export default ProductListTablePage;
