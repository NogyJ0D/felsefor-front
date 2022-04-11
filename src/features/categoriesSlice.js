import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post } from '../api'

export const getAllCategories = createAsyncThunk('categories/getAllCategories', (nullDefault, thunkAPI) => {
  return get('/categories')
    .then(res => {
      return res.data
    })
})

export const createCategory = createAsyncThunk('categories/createCategory', (data, thunkAPI) => {
  return post('/categories', data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      else return res.data
    })
})

const categoriesSlice = createSlice({
  name: 'products',
  initialState: {
    loading: true,

    categories: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.loading = false
      state.categories = payload
    })

    builder.addCase(createCategory.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export default categoriesSlice.reducer
