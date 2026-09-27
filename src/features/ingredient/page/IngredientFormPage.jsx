import { useNavigate } from 'react-router-dom'

import IngredientForm from '../ui/IngredientForm'

// M08 직접 입력 등록
function IngredientFormPage() {
  const navigate = useNavigate()

  function handleSubmit(values) {
    // TODO: 등록 API 연결 (createIngredient)
    console.log('등록 요청:', values)
    navigate('/ingredients')
  }

  return <IngredientForm onSubmit={handleSubmit} submitLabel="등록하기" />
}

export default IngredientFormPage
