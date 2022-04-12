import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import productsReducer from '../features/productsSlice'
import categoriesReducer from '../features/categoriesSlice'
import cartsReducer from '../features/cartsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    categories: categoriesReducer,
    carts: cartsReducer
  }
})

export default store
