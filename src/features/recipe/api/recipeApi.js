// 백엔드 응닶히 적용
// import api from '../../../api/axios.js'

// async function recommendRecipes(ingredientIds) {
//     const response = await api.post('/api/v1/recipes/recommendations',{ingredientIds})
    
//     return response.data
    
// }

// export default recommendRecipes



import api from '../../../api/axios.js'

async function recommendRecipes(ingredientIds) {
  // 실제 POST로 보낼 데이터를 콘솔에서 확인
  console.log('추천 요청 데이터:', {
    ingredientIds,
  })

  // AI 처리 시간을 흉내 내기 위한 대기
  await new Promise((resolve) => {
    setTimeout(resolve, 1500)
  })

  // 백엔드 응답 대신 더미 JSON 조회
  const response = await api.get('/recipeRecommendations.json')

  return response.data
}

export default recommendRecipes