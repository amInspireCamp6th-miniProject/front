import Icon from './Icon'

// 아이콘 동그라미 색만 다르다
// brand M04 카메라로 촬영
// muted M04 직접 입력
const ICON_CLASS = {
  brand: 'bg-green-50 text-green-800',
  muted: 'bg-gray-100 text-gray-500',
}

// 아이콘 + 제목 + 설명 + 화살표 카드. 눌러서 다음 화면으로 가는 선택지 (M04)
function ChoiceCard({ icon, title, description, variant = 'muted', ...props }) {
  return (
    <button
      {...props}
      type="button"
      className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 p-5 text-left hover:bg-gray-50"
    >
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-full ${ICON_CLASS[variant]}`}
      >
        <Icon name={icon} className="size-6" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Icon name="chevronRight" className="size-5 shrink-0 text-gray-400" />
    </button>
  )
}

export default ChoiceCard
