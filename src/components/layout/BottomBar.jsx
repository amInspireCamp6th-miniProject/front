// 화면 하단에 붙는 버튼 영역 (M07 M08 M09 M10 M16). 부모가 flex-col + min-h-full 이면 mt-auto로 바닥에 붙는다.
function BottomBar({ children }) {
  return (
    <div className="sticky bottom-0 mt-auto flex gap-3 border-t border-gray-100 bg-white px-5 py-4">
      {children}
    </div>
  )
}

export default BottomBar
