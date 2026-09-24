import Icon from './Icon'

const VARIANT_CLASS = {
  plain: 'text-gray-700 hover:bg-gray-100', // 배경 없음: PageHeader 뒤로가기(M04~M10), ModalHeader ✕(M13)
  soft: 'bg-gray-100 text-gray-700 hover:bg-gray-200', // 회색 원: AppBar 알림 종(M02, M03, M12)
  primary: 'bg-green-700 text-white hover:bg-green-800', // 초록 원: M03 재료 추가 + 버튼
}

function IconButton({
  icon,
  'aria-label': ariaLabel,
  variant = 'plain',
  className = '',
  ...props
}) {
  return (
    <button
      {...props}
      type="button"
      aria-label={ariaLabel}
      className={`flex size-5 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASS[variant]} ${className}`}
    >
      <Icon name={icon} className="size-5" />
    </button>
  )
}
export default IconButton
