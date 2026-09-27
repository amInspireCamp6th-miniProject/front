import Chip from './Chip'

function ChipGroup({ options, value, onChange, 'aria-label': ariaLabel }) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex gap-2 overflow-x-auto">
      {options.map((option) => (
        <Chip
          key={option.value}
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
