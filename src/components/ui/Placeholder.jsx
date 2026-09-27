// 가운데 정렬된 안내 블록 (M05 촬영 안내, M06 분석 중). 위에 오는 게 아이콘이든 스피너든 달라서 children 으로 받는다.
function Placeholder({ title, description, children }) {
  return (
    <div className="flex flex-col items-center gap-3 px-10 text-center">
      {children}
      <p className="font-bold text-gray-900">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  )
}

export default Placeholder
