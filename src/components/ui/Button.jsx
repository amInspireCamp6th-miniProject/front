//공통 버튼
// primary M01 로그인 M02 레시피 추천 받기 M05 촬영하기 M07 전체 등록하기 M08 M10 등록하기 / 수정하기
// M13 M15 선택한 재료 N개로 추천받기 M16 이대로 등록
// secondary M09 수정
// dark M01 회원가입
// outline M05 앨범에서 여러 장 선택 M07 다시 촬영하기 M16 다시 확인할게요
// ghost M01 둘러보기
// danger M09 삭제
const VARIANT_CLASS = {
  primary: 'bg-green-700 text-white hover:bg-green-800',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  dark: 'bg-gray-800 text-white hover:bg-gray-700 ',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-400 underline hover:text-gray-600',
  danger: 'bg-red-50 text-red-500 hover:bg-red-100',
}
// sm : M03 레시피 추천 M16 다시 확인할게요 / 이대로 등록
const SIZE_CLASS = {
  md: 'h-12 px-5 text-base',
  sm: 'h-9 px-4 text-sm',
}
function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
