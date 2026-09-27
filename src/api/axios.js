import axios from 'axios'

//.ENV 설정시
// const endPoint = process.env.REACT_APP_BACKEND_ENDPOINT;

const api = axios.create({
  baseURL: '/dummy',
})

export default api
