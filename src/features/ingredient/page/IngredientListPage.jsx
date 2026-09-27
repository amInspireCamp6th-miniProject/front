import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/Button'
import ChipGroup from '../../../components/ui/ChipGroup'
import Icon from '../../../components/ui/Icon'
import IconButton from '../../../components/ui/IconButton'
import Spinner from '../../../components/ui/Spinner'
import RecipeRecommendationModal from '../../recipe/ui/RecipeRecommendationModal'
import useIngredients from '../hooks/useIngredients'
import { STORAGE } from '../model/storage'
import IngredientRow from '../ui/IngredientRow'

const ALL = 'all'

// "전체"는 이 화면에만 있는 옵션이라 여기서 덧붙이고, 냉장/냉동/실온은 STORAGE에서 가져온다
const FILTER_OPTIONS = [
  { value: ALL, label: '전체' },
  ...Object.entries(STORAGE).map(([value, { label }]) => ({ value, label })),
]

function IngredientListPage() {
  const navigate = useNavigate()
  const { ingredients, isLoading } = useIngredients()
  const [filter, setFilter] = useState(ALL)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const visibleIngredients =
    filter === ALL ? ingredients : ingredients.filter((ingredient) => ingredient.storage === filter)

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">내 식재료</h1>
        <div className="flex items-center gap-2">
          <Button variant="soft" size="sm" onClick={() => setIsModalOpen(true)}>
            <Icon name="search" className="size-4" />
            레시피 추천
          </Button>
          <IconButton
            icon="plus"
            aria-label="식재료 등록"
            variant="primary"
            onClick={() => navigate('/ingredients/new')}
          />
        </div>
      </div>

      <ChipGroup
        options={FILTER_OPTIONS}
        value={filter}
        onChange={setFilter}
        aria-label="보관 상태 필터"
      />

      <ul className="flex flex-col gap-3">
        {visibleIngredients.map((ingredient) => (
          <li key={ingredient.ingredientId}>
            <IngredientRow ingredient={ingredient} showQuantity />
          </li>
        ))}
      </ul>

      <RecipeRecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ingredients={ingredients}
      />
    </div>
  )
}

export default IngredientListPage
