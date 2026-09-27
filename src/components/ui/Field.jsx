// 라벨 + 입력 요소 + 에러 문구 묶음. 입력 요소는 children으로 받는다 (Input, Select, StorageSelector 무엇이든)
// htmlFor가 있으면 <label>로 연결하고, 없으면(버튼 묶음 등) 그냥 글자로만 보여준다
function Field({ label, htmlFor, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label &&
        (htmlFor ? (
          <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        ) : (
          <span className="text-sm font-medium text-gray-700">{label}</span>
        ))}
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default Field
