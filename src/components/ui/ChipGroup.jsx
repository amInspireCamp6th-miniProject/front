import Chip from './Chip'

// 여러 개 중 하나만 고르는 칩 묶음. 골라진 값은 부모가 들고 있고(value), 바뀌면 onChange로 알려준다.
function ChipGroup({ options, value, onChange, variant = 'pill', 'aria-label': ariaLabel }) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex gap-2 overflow-x-auto">
      {options.map((option) => (
        <Chip
          key={option.value}
          variant={variant}
          selected={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  )
}

export default ChipGroup
