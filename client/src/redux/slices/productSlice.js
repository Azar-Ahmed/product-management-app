import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  filteredProducts: [],
  selectedCategory: [],
  selectedProductType: [],
  priceRange: [],
  sortOption: "asc",
  searchKeyword: "",
  status: "idle",
  error: null,
  productDetails: null,
  addProductStatus: "idle",
  addProductError: null,
  allProductsStatus: "idle",
  allProductsError: null,
  updateProductStatus: "idle",
  updateProductError: null,
  currentPage: 1,
  totalPages: 1,
};

// Helper to get token from Redux state or fallback to localStorage
const getToken = (state) => {
  if (state.auth && state.auth.token) {
    return state.auth.token;
  }
  const tokenFromLocalStorage = localStorage.getItem("token");
  return tokenFromLocalStorage || null;
};

// Fetch filtered products with pagination
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (_, { getState, rejectWithValue }) => {
    const state = getState().products;
    const {
      selectedCategory,
      selectedProductType,
      sortOption,
      priceRange,
      searchKeyword,
      currentPage,
    } = state;

    try {
      const params = {
        page: currentPage,
        limit: 4,
        ...(selectedCategory.length > 0 && { category: selectedCategory[0] }),
        ...(selectedProductType.length > 0 && {
          product_type: selectedProductType[0],
        }),
        sort: sortOption === "lowToHigh" ? "asc" : "desc",
        ...(priceRange[0] !== undefined && { minPrice: priceRange[0] }),
        ...(priceRange[1] !== undefined && { maxPrice: priceRange[1] }),
        ...(searchKeyword && { keyword: searchKeyword }),
      };

      const response = await axios.get(
        "http://localhost:5001/api/v1/product/filter",
        { params }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Fetch all products (Admin view)
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5001/api/v1/product");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/product/${id}`
      );
      return response.data?.product || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      const response = await axios.post(
        "http://localhost:5001/api/v1/product/add",
        productData,
        config
      );
      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Add product failed"
      );
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
         withCredentials: true,
      };
     await axios.delete(
        `http://localhost:5001/api/v1/product/delete/${id}`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete product failed"
      );
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      const response = await axios.put(
        `http://localhost:5001/api/v1/product/update/${id}`,
        updatedData,
        config
      );
      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update product failed"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts(state, action) {
      state.items = action.payload;
    },
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedProductType(state, action) {
      state.selectedProductType = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
    clearProductDetails(state) {
      state.productDetails = null;
    },
    setSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredProducts = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.productDetails = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.productDetails = null;
      })

      .addCase(addProduct.pending, (state) => {
        state.addProductStatus = "loading";
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatus = "succeeded";
        state.items.push(action.payload);
        state.filteredProducts.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = "failed";
        state.addProductError = action.payload;
      })

      .addCase(fetchAllProducts.pending, (state) => {
        state.allProductsStatus = "loading";
        state.allProductsError = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProductsStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.allProductsStatus = "failed";
        state.allProductsError = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.payload;
        state.items = state.items.filter((item) => item._id !== id);
        state.filteredProducts = state.filteredProducts.filter(
          (item) => item._id !== id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.updateProductStatus = "loading";
        state.updateProductError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStatus = "succeeded";
        const updatedProduct = action.payload;
        state.items = state.items.map((item) =>
          item._id === updatedProduct._id ? updatedProduct : item
        );
        state.filteredProducts = state.filteredProducts.map((item) =>
          item._id === updatedProduct._id ? updatedProduct : item
        );
        if (
          state.productDetails &&
          state.productDetails._id === updatedProduct._id
        ) {
          state.productDetails = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStatus = "failed";
        state.updateProductError = action.payload;
      });
  },
});

export const {
  setAllProducts,
  setFilteredProducts,
  setSelectedCategory,
  setSelectedProductType,
  setPriceRange,
  setSortOption,
  clearProductDetails,
  setSearchKeyword,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
