import { useState } from 'react'

import Button from '../../../components/ui/Button.jsx'
import RecipeRecommendationModal from '../../recipe/ui/RecipeRecommendationModal.jsx'

function IngredientListPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main
      className="
        min-h-dvh 
        bg-gray-50 
        p-6"
    >
      <h1
        className="
            mb-6 
            text-xl 
            font-bold 
        text-gray-900"
      >
        {' '}
        모달 테스트
      </h1>

      {/* button component */}
      <Button
        className="
            h-12 rounded-lg 
            bg-green-700 
            px-5 
            text-white 
            hover:bg-green-800"
        onClick={() => setIsOpen(true)}
      >
        레시피 추천 모달 열기
      </Button>

      {/* modal component */}
      <RecipeRecommendationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  )
}

export default IngredientListPage
