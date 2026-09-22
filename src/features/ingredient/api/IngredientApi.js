import api from '../../../api/axios.js'

async function getIngredients() {
  const response = await api.get('/ingredients.json')

  return response.data
}

export default getIngredients