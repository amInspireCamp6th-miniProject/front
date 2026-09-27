import { useNavigate, useParams } from 'react-router-dom'

import Spinner from '../../../components/ui/Spinner'
import useIngredient from '../hooks/useIngredient'
import IngredientForm from '../ui/IngredientForm'

// M10 식재료 수정
function IngredientEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ingredient, isLoading } = useIngredient(id)

  function handleSubmit(values) {
    // TODO: 수정 API 연결 (updateIngredient)
    console.log('수정 요청:', id, values)
    navigate(`/ingredients/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  if (!ingredient) {
    return <p className="p-5 text-center text-gray-500">재료를 찾을 수 없어요</p>
  }

  const { productName, categoryId, quantity, unit, storage } = ingredient

  return (
    <IngredientForm
      initialValues={{ productName, categoryId, quantity, unit, storage }}
      onSubmit={handleSubmit}
      submitLabel="수정하기"
    />
  )
}

export default IngredientEditPage
