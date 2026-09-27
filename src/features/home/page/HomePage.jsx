import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import StatCard from '../../../components/ui/StatCard'
import useIngredients from '../../ingredient/hooks/useIngredients'
import { isUrgent } from '../../ingredient/model/daysLeft'
import IngredientRow from '../../ingredient/ui/IngredientRow'
import RecipeRecommendationModal from '../../recipe/ui/RecipeRecommendationModal'

const URGENT_PREVIEW_COUNT = 3

function HomePage() {
  const { ingredients, isLoading } = useIngredients()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const urgentIngredients = ingredients.filter((ingredient) => isUrgent(ingredient.daysLeft))

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">안녕하세요!</h1>
        <p className="mt-1 text-gray-500">오늘도 맛있는 하루 되세요 🙂</p>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="전체 식재료" value={ingredients.length} />
        <StatCard label="임박 식재료" value={urgentIngredients.length} highlight />
        <StatCard label="신규 식재료" value={0} />
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900">🔥 먼저 먹어야 해요</h2>
          <Link to="/ingredients" className="text-sm text-gray-400">
            전체보기 ›
          </Link>
        </div>

        <ul className="flex flex-col gap-3">
          {urgentIngredients.slice(0, URGENT_PREVIEW_COUNT).map((ingredient) => (
            <li key={ingredient.ingredientId}>
              <IngredientRow ingredient={ingredient} />
            </li>
          ))}
        </ul>
      </section>

      <Button onClick={() => setIsModalOpen(true)}>레시피 추천 받기</Button>

      <RecipeRecommendationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default HomePage
