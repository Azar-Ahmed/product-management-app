import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:5001/api/v1/product'
// Async thunk to fetch products with filters, search, pagination
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, search = '', brand = '', category = '', product_type = '', sort = '' }) => {
    const { data } = await axios.get(
      `${baseUrl}/filter?page=${page}&search=${search}&brand=${brand}&category=${category}&product_type=${product_type}&sort=${sort}`
    );
    return data;
  }
);

// Async thunk to add product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    const { data } = await axios.post(`${baseUrl}/add`, productData);
    return data;
  }
);

// Async thunk to get a single product by id
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    return data;
  }
);

// Async thunk to update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }) => {
    const { data } = await axios.put(`${baseUrl}/update/${id}`, productData);
    return data;
  }
);

// Async thunk to delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axios.delete(`${baseUrl}/delete/${id}`);
    return id;
  }
);

const initialState = {
  products: [],
  product: null,
  pages: 1,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct(state) {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // addProduct
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        // optionally push new product to products array or refetch later
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // optionally update product in products list
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;
