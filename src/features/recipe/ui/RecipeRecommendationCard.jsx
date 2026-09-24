function RecipeRecommendationCard({ recipe, index, isExpanded, onToggle }) {
  const detailId = `recipe-detail-${index}`

  return (
    <article
      className={
        isExpanded
          ? 'overflow-hidden rounded-xl border border-green-600 bg-white shadow-sm'
          : 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'
      }
    >
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isExpanded}
        aria-controls={detailId}
        className="
                flex 
                w-full 
                items-center 
                justify-between 
                px-4 
                py-4
                text-left 
                transition-colors 
                hover:bg-green-50"
      >
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">{recipe.name}</h3>

          <p className="mt-1 text-xs text-gray-500">
            사용 재료: {recipe.usedIngredients.join(', ')}
          </p>

          {recipe.additionalIngredients.length > 0 && (
            <p
              className="
                            mt-2 
                            inline-flex 
                            rounded-full 
                            bg-red-50 
                            px-2 
                            py-1 
                            text-xs 
                            font-medium 
                            text-red-600"
            >
              추가 필요: {recipe.additionalIngredients.join(', ')}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className={
            isExpanded
              ? 'ml-3 shrink-0 rotate-180 text-green-700 transition-transform'
              : 'ml-3 shrink-0 text-green-700 transition-transform'
          }
        >
          ▼
        </span>
      </button>

      {isExpanded && (
        <div
          id={detailId}
          className="
            border-t 
            border-green-100 
            bg-green-50/40 
            px-4 
            py-4"
        >
          <p className="text-sm text-gray-500">예상 조리 시간 {recipe.cookingTime}분</p>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-700">
            {recipe.instructions}
          </p>
        </div>
      )}
    </article>
  )
}

export default RecipeRecommendationCard
