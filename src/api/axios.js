import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  // Refresh Token 이 HttpOnly 쿠키로 오니까, 요청에 쿠키를 같이 실어 보낸다
  withCredentials: true,
})

// 요청 인터셉터: 모든 요청이 나가기 직전에 한 번 거치는 함수.
// 저장된 Access Token 이 있으면 Authorization 헤더를 붙인다.
// 로그인 화면이 생기기 전엔 브라우저 콘솔에서 localStorage.setItem('accessToken', '...') 로 넣어 테스트한다
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
