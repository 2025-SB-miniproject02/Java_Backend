import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import MyPages from './pages/MyPages'
import RequireLogin from './components/RequireLogin'
import Login from './components/Login'

const App = () => {
  const { user, showUserLogin, setShowUserLogin } = useAppContext()
  const location = useLocation()

  // 로그인이 필요한 경로에 접근할 때 로그인 모달 표시
  useEffect(() => {
    const protectedPaths = ['/my-orders', '/my-pages', '/seller']
    const isProtected = protectedPaths.some(path => location.pathname.startsWith(path))
    if (isProtected && !user) {
      setShowUserLogin(true)
    }
  }, [location.pathname, user, setShowUserLogin])

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      <Navbar />

      {showUserLogin && <Login />}

      <Toaster />

      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />

          {/* 로그인 필요 라우트 */}
          <Route path='/my-orders' element={
            <RequireLogin>
              <MyOrders />
            </RequireLogin>
          } />
          <Route path='/my-pages' element={
            <RequireLogin>
              <MyPages />
            </RequireLogin>
          } />
          <Route path='/seller' element={
            <RequireLogin>
              <SellerLayout />
            </RequireLogin>
          }>
            <Route index element={<AddProduct />} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
