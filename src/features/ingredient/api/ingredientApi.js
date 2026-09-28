import api from '../../../api/axios.js'
import { findCategoryIdByName, INGREDIENT_CATEGORY } from '../model/categoryMap.js'
import { calcDaysLeft } from '../model/daysLeft.js'

// 프론트 값 → 백엔드 StorageType enum 상수명 (백엔드 확인값)
const STORAGE_TYPE = {
  FRIDGE: 'REFRIGERATED',
  FREEZER: 'FROZEN',
  ROOM: 'ROOM_TEMP',
}

// 명세 값 → 프론트 값. STORAGE_TYPE 의 key/value 를 뒤집은 것
const STORAGE_FROM_TYPE = Object.fromEntries(
  Object.entries(STORAGE_TYPE).map(([front, back]) => [back, front]),
)

// 폼 값(프론트 이름) → 요청 본문(명세 이름). 필드명이 안 맞는 건 전부 여기서만 바꾼다
function toIngredientRequest(values) {
  return {
    productName: values.productName,
    ingredientName: values.ingredientName,
    category: INGREDIENT_CATEGORY[values.categoryId].name,
    quantity: Number(values.quantity),
    unit: values.unit,
    purchaseDate: values.purchaseDate,
    expirationDate: values.expiryDate,
    storageType: STORAGE_TYPE[values.storage],
  }
}

// 사진까지 보내는 multipart 본문 (백엔드 확인값).
// 'request' 파트: 등록 JSON. 스프링 @RequestPart 가 객체로 바꾸려면 파트의 Content-Type 이
//   application/json 이어야 해서, 문자열 대신 type 을 붙인 Blob 으로 넣는다
// 'image' 파트: 원본 File 그대로. jpeg/png, 5MB 이하
function toIngredientFormData(values) {
  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(toIngredientRequest(values))], { type: 'application/json' }),
  )
  formData.append('image', values.photo)

  return formData
}

// 명세 응답 1건 → 프론트가 쓰는 모양. toIngredientRequest 의 반대 방향
function fromIngredientResponse(item) {
  return {
    ingredientId: item.ingredientId,
    productName: item.productName,
    ingredientName: item.ingredientName,
    categoryId: findCategoryIdByName(item.category),
    quantity: item.quantity,
    unit: item.unit,
    purchaseDate: item.purchaseDate,
    expiryDate: item.expirationDate,
    daysLeft: item.daysLeft ?? calcDaysLeft(item.expirationDate),
    storage: STORAGE_FROM_TYPE[item.storageType],
    imageUrl: item.imageUrl, // '/api/v1/ingredients/15/image' 형태 주소. 없으면 null
  }
}

// 식재료 전체 조회 GET /api/v1/ingredients
export async function getIngredients() {
  const response = await api.get('/api/v1/ingredients')

  return response.data.map(fromIngredientResponse)
}

// 식재료 상세 조회 GET /api/v1/ingredients/{ingredientId}
export async function getIngredient(ingredientId) {
  const response = await api.get(`/api/v1/ingredients/${ingredientId}`)

  return fromIngredientResponse(response.data)
}

// 식재료 등록. values.photo(File) 유무로 엔드포인트가 갈린다
// - 사진 있음: POST /api/v1/ocr/ingredients/register (multipart). 사진을 같이 저장한다
// - 사진 없음: POST /api/v1/ingredients (JSON). 이 요청 DTO 에는 이미지 필드가 없다
// axios 는 본문이 FormData 면 Content-Type 을 multipart/form-data 로 알아서 바꾼다
export async function createIngredient(values) {
  const response = values.photo
    ? await api.post('/api/v1/ocr/ingredients/register', toIngredientFormData(values))
    : await api.post('/api/v1/ingredients', toIngredientRequest(values))

  return fromIngredientResponse(response.data)
}

// 식재료 수정 PATCH /api/v1/ingredients/{ingredientId}. 요청 본문은 등록과 같은 모양
export async function updateIngredient(ingredientId, values) {
  const response = await api.patch(
    `/api/v1/ingredients/${ingredientId}`,
    toIngredientRequest(values),
  )

  return fromIngredientResponse(response.data)
}

// 식재료 사진 교체 PUT /api/v1/ingredients/{ingredientId}/image
// 수정 API(PATCH) 본문에는 이미지 필드가 없어서 사진만 따로 multipart 로 보낸다. 'image' 파트에 File 그대로.
// (백엔드 추가 요청 중인 엔드포인트. 생기기 전까지는 404 가 난다)
export async function updateIngredientImage(ingredientId, photo) {
  const formData = new FormData()
  formData.append('image', photo)

  console.log(formData)
  const response = await api.put(`/api/v1/ingredients/${ingredientId}/image`, formData)
  console.log(response)

  return fromIngredientResponse(response.data)
}

// 식재료 삭제 DELETE /api/v1/ingredients/{ingredientId}
export async function deleteIngredient(ingredientId) {
  await api.delete(`/api/v1/ingredients/${ingredientId}`)
}
