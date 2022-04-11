import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import productsReducer from '../features/productsSlice'
import categoriesReducer from '../features/categoriesSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    categories: categoriesReducer
  }
})

export default store
