import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createIngredient } from '../api/ingredientApi'
import IngredientForm from '../ui/IngredientForm'

// M08 직접 입력 등록
function IngredientFormPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values) {
    setIsSubmitting(true)

    try {
      await createIngredient(values)
      // replace: 등록 끝난 폼으로 뒤로가기해서 돌아오지 않게 히스토리에서 지운다
      navigate('/ingredients', { replace: true })
    } catch (error) {
      const message = error.response?.data?.message ?? '등록에 실패했어요. 다시 시도해주세요.'
      window.alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <IngredientForm onSubmit={handleSubmit} submitLabel="등록하기" isSubmitting={isSubmitting} />
  )
}

export default IngredientFormPage
