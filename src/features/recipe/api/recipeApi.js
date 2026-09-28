import api from '../../../api/axios.js'

// AI 기반 레시피 추천 POST /api/v1/recipes/recommendations
// 요청: { ingredientIds: [1, 2, 3] }
// 응답: [{ name, cookingTime, usedIngredients, additionalIngredients, instructions }, ...]
async function recommendRecipes(ingredientIds) {
  const response = await api.post('/api/v1/recipes/recommendations', { ingredientIds })

  return response.data
}

export default recommendRecipes
