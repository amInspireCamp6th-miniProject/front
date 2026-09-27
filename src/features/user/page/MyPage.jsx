import Icon from '../../../components/ui/Icon'
import MenuRow from '../../../components/ui/MenuRow'

// M12 마이페이지
function MyPage() {
  function handleLogout() {
    // TODO: 로그아웃 API 연결 후 /login 으로 이동
    console.log('로그아웃')
  }

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
          <Icon name="user" className="size-7" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-lg font-bold text-gray-900">김냉장님</p>
          <p className="truncate text-sm text-gray-500">user@email.com</p>
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
