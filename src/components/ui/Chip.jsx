// pill: M03 보관 상태 필터, M13 필터·재료 칩 (알약 모양, 내용 폭만큼)
// segment: M07 M08 M10 보관상태 선택 (가로 꽉 채우는 칸, 회색 배경)
const VARIANT_CLASS = {
  pill: {
    base: 'h-9 shrink-0 rounded-full px-4 text-sm',
    selected: 'bg-green-700 text-white',
    unselected: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  },
  segment: {
    base: 'h-12 flex-1 rounded-xl text-base',
    selected: 'bg-green-700 text-white',
    unselected: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  },
}

function Chip({ selected = false, variant = 'pill', children, ...props }) {
  const style = VARIANT_CLASS[variant]

  return (
    <button
      {...props}
      type="button"
      aria-pressed={selected}
      className={`inline-flex items-center justify-center gap-1 font-medium ${style.base} ${selected ? style.selected : style.unselected}`}
    >
      {children}
    </button>
  )
}

export default Chip
