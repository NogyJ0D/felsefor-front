import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post, put } from '../api'

export const getUserCart = createAsyncThunk('carts/getUserCart', (userId, thunkAPI) => {
  return get(`/carts/user-id/${userId}`)
    .then(res => {
      return res.data
    })
})

export const addItemToCart = createAsyncThunk('carts/addItemToCart', ({ cartId, data }, thunkAPI) => {
  return put(`/carts/add-item/cart-id/${cartId}`, data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      else return res.data
    })
})

export const reduceItemFromCart = createAsyncThunk('carts/reduceItemFromCart', ({ cartId, data }, thunkAPI) => {
  return put(`/carts/reduce-item/cart-id/${cartId}`, data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      else return res.data
    })
})

const cartsSlice = createSlice({
  name: 'carts',
  initialState: {
    loading: true,
    error: false,
    message: false,

    userId: undefined,
    products: [],
    id: undefined,
    totalPrice: undefined
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserCart.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getUserCart.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = undefined

      state.userId = payload.cart.userId
      state.products = payload.cart.products
      state.id = payload.cart._id
      state.totalPrice = payload.totalPrice
    })
    builder.addCase(getUserCart.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(addItemToCart.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(addItemToCart.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = undefined

      state.products = payload.newCart.products
      state.totalPrice = payload.totalPrice
    })
    builder.addCase(addItemToCart.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(reduceItemFromCart.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(reduceItemFromCart.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = undefined

      state.products = payload.newCart.products
      state.totalPrice = payload.totalPrice
    })
    builder.addCase(reduceItemFromCart.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export default cartsSlice.reducer
