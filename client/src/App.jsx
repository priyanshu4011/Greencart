// 
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './components/Login'
import { useLocation, Routes, Route, Navigate } from 'react-router-dom'
import AppContextProvider, { useAppContext } from './context/AppContext'
import MyOrders from './pages/MyOrders'
import AddAddress from './pages/AddAddress'
import SellerLogin from './pages/SellerLogin'
import AddProduct from './pages/AddProduct'
import Order from './pages/Order'
import SellerProducts from './pages/SellerProducts'
import AdminLogin from './pages/AdminLogin'
import AdminProducts from './pages/AdminProducts'

const App = () => {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  )
}

const AppContent = () => {
  const { showUserLogin } = useAppContext()
  const isSellerPath = useLocation().pathname.includes('seller') || useLocation().pathname.includes('admin')

  return (
    <div className="bg-white">
      {!isSellerPath ? <Navbar /> : null}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:categoryName" element={<AllProducts />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/seller" element={<Navigate to="/seller/login" replace />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/orders" element={<Order />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App