import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import HomeLayout from './layouts/HomeLayout'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import PaymentResult from './pages/PaymentResult'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Shop from './pages/Shop'
import NewProduct from './pages/NewProduct'
import ProductDetails from './pages/ProductDetails'
import NewCategory from './pages/NewCategory'

import { autoLogin } from './features/userSlice'
import { getAll } from './features/productsSlice'
import { getAllCategories } from './features/categoriesSlice'
import AdminPanel from './pages/AdminPanel'
import { getUserCart } from './features/cartsSlice'
import UserCart from './pages/UserCart'

function App () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(async () => {
    await dispatch(autoLogin())
    await dispatch(getAll({ filter: 'none', limit: 10 }))
    await dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (!user.loading && user.logged && user.id) {
      dispatch(getUserCart(user.id))
    }
  }, [user.logged])

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='shop' element={<Shop />} />
        <Route path='my-cart' element={<UserCart />} />
        <Route path='admin-panel' element={<AdminPanel />} />
        <Route path='create-product' element={<NewProduct />} />
        <Route path='create-category' element={<NewCategory />} />
        <Route path='products/:productId' element={<ProductDetails />} />
        <Route path='checkout'>
          <Route index element={<Checkout />} />
          <Route path='success' element={<PaymentResult />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App
