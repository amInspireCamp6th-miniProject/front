// text / number / date 전부 이 컴포넌트. 종류는 type으로 넘긴다 (M07 M08 M10 폼)
const STATE_CLASS = {
  normal: 'border-gray-200 bg-white text-gray-900 focus:ring-green-200',
  error: 'border-red-300 bg-red-50 text-red-500 focus:ring-red-200',
}

function Input({ hasError = false, className = '', ...props }) {
  return (
    <input
      {...props}
      aria-invalid={hasError || undefined}
      className={`h-12 w-full rounded-xl border px-4 text-base placeholder:text-gray-400 focus:ring-2 focus:outline-none ${hasError ? STATE_CLASS.error : STATE_CLASS.normal} ${className}`}
    />
  )
}

export default Input
