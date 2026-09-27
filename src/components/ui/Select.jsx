import Icon from './Icon'

// 브라우저 기본 <select>. 기본 화살표를 숨기고(appearance-none) 우리 아이콘을 오른쪽에 겹쳐 놓는다.
const STATE_CLASS = {
  normal: 'border-gray-200 bg-white text-gray-900 focus:ring-green-200',
  error: 'border-red-300 bg-red-50 text-red-500 focus:ring-red-200',
}

function Select({ options, placeholder, hasError = false, className = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      <select
        {...props}
        aria-invalid={hasError || undefined}
        className={`h-12 w-full appearance-none rounded-xl border pr-10 pl-4 text-base focus:ring-2 focus:outline-none ${hasError ? STATE_CLASS.error : STATE_CLASS.normal}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevronDown"
        className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-gray-400"
      />
    </div>
  )
}

export default Select
