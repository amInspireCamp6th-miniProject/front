import useIngredients from './useIngredients'

// 재료 하나 조회. 지금은 더미가 목록만 있어서 목록에서 골라내고, 단건 API 가 생기면 그걸로 바꾼다.
function useIngredient(id) {
  const { ingredients, isLoading, error } = useIngredients()

  const ingredient = ingredients.find((item) => String(item.ingredientId) === String(id)) ?? null

  return { ingredient, isLoading, error }
}

export default useIngredient
