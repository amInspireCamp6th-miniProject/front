import Icon from './Icon'

// default M12 내 정보 수정, 공지사항
// danger M12 로그아웃
const VARIANT_CLASS = {
  default: 'text-gray-900',
  danger: 'text-red-500',
}

// 아이콘 + 글자 + 오른쪽 화살표 메뉴 한 줄. 눌러서 어딘가로 가는 거라 root 는 <button>
function MenuRow({ icon, variant = 'default', showChevron = true, children, ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={`flex h-14 w-full items-center gap-4 px-2 text-left font-medium disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASS[variant]}`}
    >
      <Icon name={icon} className="size-5 shrink-0" />
      <span className="flex-1">{children}</span>
      {showChevron && <Icon name="chevronRight" className="size-5 shrink-0 text-gray-400" />}
    </button>
  )
}

export default MenuRow
