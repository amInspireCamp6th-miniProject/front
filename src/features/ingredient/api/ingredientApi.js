import api from '../../../api/axios.js'
import { findCategoryIdByName, INGREDIENT_CATEGORY } from '../model/categoryMap.js'
import { calcDaysLeft } from '../model/daysLeft.js'
import { toBase64Only, toImageSrc } from '../model/image.js'

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
    // 사진은 순수 base64 문자열. 수동 등록(M08)처럼 사진이 없으면 null.
    // 백엔드 DTO 에 아직 이 필드가 없어서 지금은 무시된다(에러 없음). 백엔드 추가 요청 중
    imageUrl: toBase64Only(values.imageUrl),
  }
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
    imageUrl: toImageSrc(item.imageUrl),
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

// 식재료 등록 POST /api/v1/ingredients
export async function createIngredient(values) {
  const response = await api.post('/api/v1/ingredients', toIngredientRequest(values))

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

// 식재료 삭제 DELETE /api/v1/ingredients/{ingredientId}
export async function deleteIngredient(ingredientId) {
  await api.delete(`/api/v1/ingredients/${ingredientId}`)
}
