import api from '../../../api/axios.js'

// 회원가입 POST /api/v1/auth/signup (백엔드 확인값)
// 요청: { email, password, nickname }. 응답 201: { userId, email, nickname }
// 실패: 400 검증 실패(errors[{field, reason}]), 409 DUPLICATE_EMAIL
export async function signup({ email, password, nickname }) {
  const response = await api.post('/api/v1/auth/signup', { email, password, nickname })

  return response.data
}

// 로그인 POST /api/v1/auth/login
// 응답: { accessToken, user: { userId, email, nickname } }. Refresh Token 은 HttpOnly 쿠키로 따로 온다
// 실패: 401 INVALID_CREDENTIALS (이메일 없음·비밀번호 틀림 구분 안 함)
export async function login({ email, password }) {
  const response = await api.post('/api/v1/auth/login', { email, password })

  return response.data
}

// 로그아웃 POST /api/v1/auth/logout. 서버가 토큰을 블랙리스트에 올리고 쿠키를 지운다. 응답 204
export async function logout() {
  await api.post('/api/v1/auth/logout')
}

// 내 정보 GET /api/v1/auth/me. 응답: { userId, email, nickname }
export async function getMe() {
  const response = await api.get('/api/v1/auth/me')

  return response.data
}
