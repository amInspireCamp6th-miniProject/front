import { useState } from 'react'
import RecipeRecommendationCard from './RecipeRecommendationCard.jsx'

function RecipeRecommendationResult({ recipes }) {
  const [expandedIndex, setExpandedIndex] = useState(null) //펼쳐진 카드 검사

  // 같은걸 선택했는지 평가해서 index랑 current index가 동일하면 닫음
  function handleToggle(index) {
    setExpandedIndex((currentIndex) =>
      currentIndex === index ? null : index,
    )
  }

  return (
    <section className="mt-6">
      <p className="mb-3 text-sm text-gray-600">
        선택한 재료로 만들 수 있는 레시피{' '}
        <span className="font-semibold text-green-700">
          {recipes.length}개
        </span>
      </p>

      <div className="space-y-3">
        {recipes.map((recipe, index) => (
          
        //   레시피 추천 카드 UI(아코디언식)
          <RecipeRecommendationCard
            // 나중에 api 보고 key={recipe.id}로 교체 예정
            key={`${recipe.name}-${index}`}
            recipe={recipe}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  )
}

export default RecipeRecommendationResult