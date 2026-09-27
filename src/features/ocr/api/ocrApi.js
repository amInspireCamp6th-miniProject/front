import api from '../../../api/axios.js'

// 백엔드 구현시 image 전달
// async function recognizeIngredients(imageFile) {
//   const formData = new FormData()
//   formData.append('image', imageFile)

//   const response = await api.post(
//     '/api/v1/ocr/ingredients',
//     formData,
//   )

//   return response.data
// }

async function recognizeIngredients() {
  const response = await api.get('/ocrIngredients.json')

  return response.data
}

export default recognizeIngredients
