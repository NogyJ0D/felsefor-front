import axios from 'axios'
import { URL } from '../config'

const instance = axios.create({
  baseURL: URL
  // withCredentials: true
})

export const get = url => {
  return instance.get(url, { withCredentials: true })
}

export const post = (url, data) => {
  return instance.post(url, data, { withCredentials: true })
    .then(res => { return res })
    .catch(err => { return err.response.data })
}

export const postFile = (url, data) => {
  return instance.post(url, data, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
    .then(res => { return res })
    .catch(err => { return err.response.data })
}
