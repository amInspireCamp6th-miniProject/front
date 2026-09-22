//공통 버튼
//childres :contents, className : style

function Button({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      {...props}
      type={type}
      className={`
        inline-flex items-center justify-center
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
