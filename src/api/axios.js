import axios from 'axios'

//.ENV 설정시
// const endPoint = process.env.REACT_APP_BACKEND_ENDPOINT;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
})

export default api
