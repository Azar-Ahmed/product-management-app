import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from './redux/slices/authSlice'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Layout from './components/Layout'
import AppNavbar from './components/Navbar'
import Footer from './components/Footer'
import ProductListTable from './pages/ProductListTable'
import ProtectedRoute from './components/ProtectedRoute' // ⬅️ Import it
import NotFound from './pages/NotFound'
import EditProduct from './pages/EditProduct'
import Profile from './pages/Profile'
function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Router>
      <AppNavbar isAuthenticated={!!user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductList />
            </Layout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        {/* Protect this route for admin only */}

           <Route
          path="/admin/profile"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <ProductListTable />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AddProduct />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <EditProduct />
              </Layout>
            </ProtectedRoute>
          }
        />

          {/* Not Found  */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
