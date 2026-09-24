const VARIANT_CLASS = {
  blue: 'bg-blue-50 text-blue-600', // 냉장(StorageBadge), M09 카테고리 "유제품"
  sky: 'bg-sky-50 text-sky-600', // 냉동(StorageBadge)
  amber: 'bg-amber-50 text-amber-600', // 실온(StorageBadge)
  gray: 'bg-gray-100 text-gray-600', // 기본값, 아직 쓰는 곳 없음
}

function Badge({ variant = 'gray', children }) {
  return (
    <span
      className={`inline-flex h-7 shrink-0 items-center rounded-full px-3 text-xs font-semibold ${VARIANT_CLASS[variant]}`}
    >
      {children}
    </span>
  )
}

export default Badge
