import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuthStore from '../../../stores/useAuthStore'

// 로그인이 필요한 라우트 묶음의 부모. 토큰이 없으면 로그인 화면으로 보낸다.
// state.from 에 원래 가려던 주소를 담아 두면 로그인 후 그리로 돌려보낼 수 있다 (지금은 홈으로 보낸다)
function RequireAuth() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const location = useLocation()

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth
