# 🛍️ Product Management Frontend

This is a modern **React.js** frontend application for managing and browsing e-commerce products. It includes public product browsing features, as well as a secure admin panel for managing the catalog. The UI is built with **React-Bootstrap** and **react-data-table-component**, and it uses **Redux Toolkit** for state management and **Axios** for backend communication.

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Start Development Server

```bash
npm start
```

---

## 📁 Folder Structure

```
src/
├── components/         # Reusable UI components
├── features/           # Redux slices (auth, product)
├── pages/              # Pages (Home, Login, Register, Products, Admin)
├── services/           # Axios API requests
├── App.js              # Main App component with routing
├── index.js            # React entry point
└── store.js            # Redux store configuration
```

---

## 🧪 Tech Stack

- **UI Framework**: React.js
- **Styling**: React-Bootstrap, react-data-table-component
- **Routing**: react-router-dom
- **State Management**: Redux Toolkit, react-redux
- **HTTP Requests**: Axios

---

## 📦 Installed Packages

```json
"axios": "^1.x",
"react": "^18.x",
"react-bootstrap": "^2.x",
"react-data-table-component": "^7.x",
"react-dom": "^18.x",
"react-redux": "^9.x",
"@reduxjs/toolkit": "^2.x",
"react-router-dom": "^6.x"
```

---

## 🧰 Key Features

### 🔓 Public Features

- 🏠 **Home Page**  
  Display featured products or categories.

- 📄 **Product Listing Page**  
  - View all products
  - Filter by **category**, **product type**, **price range**
  - Sort by **price**, **name**, or **rating**
  - Search by keyword
  - Pagination

- 📦 **Product Detail Page**  
  - View detailed product information including image, price, description, and reviews

- 🔐 **Authentication Pages**  
  - User/Admin Login
  - Registration

---

### 🔧 Admin Features

- 📋 **Admin Dashboard**
  - View all products in a data table
  - Filter, search, and sort products
  - Paginated product list

- ➕ **Add Product Page**
  - Form to add new product with image upload

- ✏️ **Edit Product Page**
  - Form to update product info and image

- ❌ **Delete Product**
  - Remove a product from the catalog

- 👤 **Admin Profile Page**
  - Display admin details

- 🔄 **Update Profile Page**
  - Edit name, email, phone, profile image, and password

- 🔐 **Protected Routes**
  - Admin pages require authentication and admin role access

---

## 🔗 Routing Structure

| Route                   | Component              | Access        |
|-------------------------|------------------------|----------------|
| `/`                     | HomePage               | Public         |
| `/products`             | ProductListPage        | Public         |
| `/products/:id`         | ProductDetailPage      | Public         |
| `/login`                | LoginPage              | Public         |
| `/register`             | RegisterPage           | Public         |
| `/admin/products`       | AdminProductListPage   | Admin Only     |
| `/admin/products/add`   | AddProductPage         | Admin Only     |
| `/admin/products/edit/:id` | EditProductPage    | Admin Only     |
| `/admin/profile`        | AdminProfilePage       | Admin Only     |
| `/admin/profile/update` | UpdateProfilePage      | Admin Only     |

---

## 🛠️ State Management (Redux Toolkit)

- `authSlice.js` – Authentication and user state
- `productSlice.js` – Products state and async actions

---

## 🌐 API Integration

API calls are modularized in the `services/` directory using Axios.

Example:

```js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

export const getAllProducts = () => API.get('/product');
export const getProductDetails = (id) => API.get(`/product/${id}`);
export const addProduct = (data) => API.post('/product/add', data);
export const updateProduct = (id, data) => API.put(`/product/update/${id}`, data);
export const deleteProduct = (id) => API.delete(`/product/delete/${id}`);
```

---

## 📬 Contact

Feel free to contribute, report issues, or suggest improvements via GitHub or direct contact.

---

**Made with ❤️ using React.js, Redux, and Axios**
