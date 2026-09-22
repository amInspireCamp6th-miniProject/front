import Button from '../../../components/common/Button.jsx'

const FILTER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'urgent', label: '임박 재료' },
  { value: 'owned', label: '보유 재료' },
]

function RecipeIngredientFilter({ value, onChange }) {
  return (
    <div className="flex gap-2" aria-label="식재료 필터">
      {FILTER_OPTIONS.map((option) => {
        const isSelected = value === option.value

        return (
          //  button component
          <Button
            key={option.value}
            className={
              isSelected
                ? 'rounded-full bg-green-700 px-4 py-2 text-white'
                : 'rounded-full border border-gray-200 px-4 py-2 text-gray-600'
            }
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}

export default RecipeIngredientFilter
