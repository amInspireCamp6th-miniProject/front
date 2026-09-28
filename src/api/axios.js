import axios from 'axios'

import useAuthStore from '../stores/useAuthStore'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''

const api = axios.create({
  baseURL,
  // Refresh Token 이 HttpOnly 쿠키로 오니까, 요청에 쿠키를 같이 실어 보낸다
  withCredentials: true,
})

// 요청 인터셉터: 모든 요청이 나가기 직전에 한 번 거치는 함수.
// 저장된 Access Token 이 있으면 Authorization 헤더를 붙인다
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// 이 경로들의 401 은 "토큰 만료"가 아니라 그 API 자체의 실패라서 재발급을 시도하지 않는다
const NO_REFRESH_PATHS = ['/api/v1/auth/login', '/api/v1/auth/signup', '/api/v1/auth/refresh']

// 재발급이 동시에 여러 번 나가지 않게 진행 중인 Promise 를 하나만 들고 있는다
let refreshPromise = null

function refreshAccessToken() {
  if (!refreshPromise) {
    // api 인스턴스를 쓰면 이 요청의 401 이 다시 인터셉터를 타서 무한 반복되니 순수 axios 로 보낸다
    refreshPromise = axios
      .post('/api/v1/auth/refresh', null, { baseURL, withCredentials: true })
      .then((response) => response.data.accessToken)
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

// 응답 인터셉터: 401 이면 Refresh Token(쿠키)으로 Access Token 을 한 번 재발급받고 원래 요청을 다시 보낸다.
// 재발급도 실패하면(Refresh 만료·로그아웃됨) 로그인 정보를 지우고 로그인 화면으로 보낸다
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    const isRetryable =
      response?.status === 401 &&
      config &&
      !config._retried &&
      !NO_REFRESH_PATHS.some((path) => config.url.startsWith(path))

    if (!isRetryable) throw error

    config._retried = true // 재시도한 요청이 또 401 이면 여기서 끝낸다

    try {
      const accessToken = await refreshAccessToken()
      useAuthStore.getState().setAuth({ accessToken })
      config.headers.Authorization = `Bearer ${accessToken}`

      return api(config)
    } catch {
      useAuthStore.getState().clearAuth()
      // React 바깥(axios)이라 navigate 를 못 써서 브라우저 주소를 직접 바꾼다
      window.location.assign('/login')
      throw error
    }
  },
)

export default api
