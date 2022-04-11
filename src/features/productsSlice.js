import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, postFile } from '../api'
import FormData from 'form-data'

export const getAll = createAsyncThunk('products/getAll', ({ filter, limit }, thunkAPI) => {
  return get(`/products/all?filter=${filter}&limit=${limit}`)
    .then(res => {
      return res.data
    })
})

export const createProduct = createAsyncThunk('products/createProduct', (data, thunkAPI) => {
  const formData = new FormData()
  if (data.logo.length === 1) formData.append('logo', data.logo[0], data.logo[0].name)
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('unitPrice', data.unitPrice)
  formData.append('totalAmount', data.totalAmount)
  formData.append('categories', data.categories)
  return postFile('/products', formData)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      else return res.data
    })
})

export const getProductById = createAsyncThunk('products/getProductById', (id, thunkAPI) => {
  return get(`/products/id/${id}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      else return res.data
    })
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: true,
    error: false,
    message: undefined,

    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: undefined,
    nextPage: undefined,
    offset: undefined,
    page: undefined,
    pagingCounter: undefined,
    prevPage: undefined,
    totalDocs: undefined,
    totalPages: undefined,

    selectedProduct: undefined
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.loading = false
      state.docs = payload.docs
      state.hasNextPage = payload.hasNextPage
      state.hasPrevPage = payload.hasPrevPage
      state.limit = payload.limit
      state.nextPage = payload.nextPage
      state.offset = payload.offset
      state.page = payload.page
      state.pagingCounter = payload.pagingCounter
      state.prevPage = payload.prevPage
      state.totalDocs = payload.totalDocs
      state.totalPages = payload.totalPages
      state.newProductId = undefined
    })

    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = undefined
    })
    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(getProductById.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = undefined

      state.selectedProduct = payload
    })
    builder.addCase(getProductById.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload

      state.selectedProduct = undefined
    })
  }
})

export default productsSlice.reducer
