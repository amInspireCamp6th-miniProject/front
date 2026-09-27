import api from '../../../api/axios.js'
// 식재료 목록 더미데이터
async function getIngredients() {
  const response = await api.get('/ingredients.json')

  return response.data
}

export default getIngredients
