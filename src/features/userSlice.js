import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post, postFile } from '../api'
import FormData from 'form-data'

export const login = createAsyncThunk('user/login', ({ email, password }, thunkAPI) => {
  return post('/auth/login', { email, password })
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      else return res.data
    })
})

export const logout = createAsyncThunk('user/logout', (nullDefault, thunkAPI) => {
  return post('/auth/logout')
    .then(res => { return res.data })
})

export const signup = createAsyncThunk('user/signup', (data, thunkAPI) => {
  const formData = new FormData()
  if (data.logo.length === 1) formData.append('logo', data.logo[0], data.logo[0].name)
  formData.append('username', data.username)
  formData.append('firstname', data.firstname)
  formData.append('lastname', data.lastname)
  formData.append('email', data.email)
  formData.append('password', data.password)
  formData.append('address[city]', data.city)
  formData.append('address[country]', data.country)
  formData.append('address[line1]', data.line1)
  formData.append('address[postal_code]', data.postal_code)
  formData.append('address[state]', data.state)
  return postFile('/auth/signup', formData)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      else return res.data
    })
})

export const autoLogin = createAsyncThunk('user/autoLogin', (data, thunkAPI) => {
  return post('/auth/validate')
    .then(res => { return res.data })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged: false,
    loading: true,
    error: false,
    message: undefined,

    username: undefined,
    email: undefined,
    firstname: undefined,
    lastname: undefined,
    id: undefined,
    role: undefined,
    profile_pic: undefined,
    customerId: undefined,
    address: undefined,
    cartId: undefined
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(login.pending, (state, action) => {
    //   state.loading = true
    // })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.username = payload.username
      state.email = payload.email
      state.firstname = payload.firstname
      state.lastname = payload.lastname
      state.id = payload.id
      state.role = payload.role
      state.profile_pic = payload.profile_pic
      state.customerId = payload.customerId
      state.address = payload.address
      state.cartId = payload.cartId
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    // builder.addCase(logout.pending, (state, action) => {
    //   state.loading = true
    // })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.logged = false
      state.loading = false
      state.error = false
      state.message = undefined

      state.username = undefined
      state.email = undefined
      state.firstname = undefined
      state.lastname = undefined
      state.id = undefined
      state.role = undefined
      state.profile_pic = undefined
      state.customerId = undefined
      state.address = undefined
      state.cartId = undefined
    })

    // builder.addCase(signup.pending, (state, action) => {
    //   state.loading = true
    // })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.username = payload.username
      state.email = payload.email
      state.firstname = payload.firstname
      state.lastname = payload.lastname
      state.id = payload.id
      state.role = payload.role
      state.profile_pic = payload.profile_pic
      state.customerId = payload.customerId
      state.address = payload.address
      state.cartId = payload.cartId
    })
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    // builder.addCase(autoLogin.pending, (state, action) => {
    //   state.loading = true
    // })
    builder.addCase(autoLogin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.username = payload.username
      state.email = payload.email
      state.firstname = payload.firstname
      state.lastname = payload.lastname
      state.id = payload.id
      state.role = payload.role
      state.profile_pic = payload.profile_pic
      state.customerId = payload.customerId
      state.address = payload.address
      state.cartId = payload.cartId
    })
    builder.addCase(autoLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export default userSlice.reducer
