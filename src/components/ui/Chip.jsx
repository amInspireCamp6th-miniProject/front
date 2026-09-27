function Chip({ selected = false, children, ...props }) {
  return (
    <button
      {...props}
      type="button"
      aria-pressed={selected}
      className={`inline-flex h-9 shrink-0 items-center gap-1 rounded-full px-4 text-sm font-medium
        ${selected ? 'bg-green-700 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
    >
      {children}
    </button>
  )
}

export default Chip
