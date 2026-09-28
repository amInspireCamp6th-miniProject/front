import api from '../../../api/axios.js'

// 식재료 이미지 인식 POST /api/v1/ocr/ingredients
// 요청: multipart/form-data, 'images' 키로 파일 여러 개
// 응답: 보낸 파일과 같은 순서의 배열 [{ productName, ingredientName, category }, ...]
async function recognizeIngredients(imageFiles) {
  // JSON 이 아니라 파일을 보내야 하니 FormData 를 쓴다.
  // 같은 키로 append 를 반복하면 서버에서 배열로 받는다
  const formData = new FormData()
  imageFiles.forEach((file) => formData.append('images', file))

  // Content-Type 은 axios 가 FormData 를 보고 multipart/form-data 로 알아서 붙인다
  const response = await api.post('/api/v1/ocr/ingredients', formData)

  return response.data
}

export default recognizeIngredients
