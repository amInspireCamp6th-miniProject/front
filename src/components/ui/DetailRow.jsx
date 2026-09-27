// 왼쪽 라벨 + 오른쪽 값 한 줄 (M09 상세). 값은 글자·Dday·StorageBadge 등 뭐든 올 수 있어서 children 으로 받는다.
function DetailRow({ label, children }) {
  return (
    <div className="flex h-14 items-center justify-between border-b border-gray-100 last:border-b-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{children}</span>
    </div>
  )
}

export default DetailRow
