import { useNavigate } from 'react-router-dom'

import Icon from '../../../components/ui/Icon'
import MenuRow from '../../../components/ui/MenuRow'
import useAuthStore from '../../../stores/useAuthStore'
import { logout } from '../api/authApi'

// M12 마이페이지
function MyPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  // 서버 로그아웃이 실패해도(이미 만료된 토큰 등) 프론트 로그인 정보는 지우고 랜딩으로 보낸다
  async function handleLogout() {
    if (!window.confirm('로그아웃할까요?')) return

    try {
      await logout()
    } catch (error) {
      console.error('로그아웃 실패:', error)
    } finally {
      clearAuth()
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
          <Icon name="user" className="size-7" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-lg font-bold text-gray-900">{user?.nickname}님</p>
          <p className="truncate text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {/* TODO: 내 정보 수정, 공지사항 화면 생기면 onClick 에 navigate 연결 */}
        <MenuRow icon="user">내 정보 수정</MenuRow>
        <MenuRow icon="book" disabled>
          받은 레시피 (보류)
        </MenuRow>
        <MenuRow icon="bell">공지사항</MenuRow>
        <MenuRow icon="x" variant="danger" showChevron={false} onClick={handleLogout}>
          로그아웃
        </MenuRow>
      </div>
    </div>
  )
}

export default MyPage
