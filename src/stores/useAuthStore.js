import { create } from 'zustand'

// 로그인 상태. 새로고침해도 유지되게 localStorage 에 같이 저장한다.
// - accessToken: axios 요청 인터셉터가 Authorization 헤더에 붙인다 (키 이름 'accessToken' 은 axios.js 와 맞춘 것)
// - user: { userId, email, nickname }. 마이페이지·홈 인사말에 쓴다
// Refresh Token 은 서버가 HttpOnly 쿠키로 관리해서 프론트 코드에는 안 나온다
const STORAGE_KEY = 'authUser'

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null
  } catch {
    return null
  }
}

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  user: readUser(),

  // 로그인·재발급 성공 시. user 는 재발급 응답에 없으니 안 넘어오면 기존 값을 유지한다
  setAuth: ({ accessToken, user }) => {
    localStorage.setItem('accessToken', accessToken)
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    set((state) => ({ accessToken, user: user ?? state.user }))
  },

  // 로그아웃·재발급 실패 시
  clearAuth: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem(STORAGE_KEY)
    set({ accessToken: null, user: null })
  },
}))

export default useAuthStore
