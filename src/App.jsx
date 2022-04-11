import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
    dispatch(getAll({ filter: 'none', limit: 10 }))
    dispatch(getAllCategories())
  }, [])

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='shop' element={<Shop />} />
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
