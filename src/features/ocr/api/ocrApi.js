import api from '../../../api/axios.js'

// 식재료 이미지 인식 POST /api/v1/ocr/ingredients (백엔드 확인값)
// 요청: multipart/form-data, 파트 이름 'image', 한 번에 1장. 전처리된 jpeg, 5MB 이하
// ScanPage가 원본 대신 prepareImageForUpload의 반환 File을 넘기므로 API 경로·파트 이름·응답 구조는 기존과 같다.
// 응답: { productName, ingredientName, category } 객체 1개. DB 저장 없음
async function recognizeIngredient(imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await api.post('/api/v1/ocr/ingredients', formData)

  return response.data
}

// 여러 장이면 장수만큼 동시에 호출해서 파일 순서대로 배열로 합친다.
// Promise.all 은 입력 배열 순서를 그대로 유지하니 index 로 사진과 결과가 짝지어진다
async function recognizeIngredients(imageFiles) {
  return Promise.all(imageFiles.map(recognizeIngredient))
}

export default recognizeIngredients
