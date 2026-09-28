import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Spinner from '../../../components/ui/Spinner'
import { updateIngredient } from '../api/ingredientApi'
import useIngredient from '../hooks/useIngredient'
import IngredientForm from '../ui/IngredientForm'

// M10 식재료 수정
function IngredientEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ingredient, isLoading } = useIngredient(id)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values) {
    setIsSubmitting(true)

    try {
      await updateIngredient(id, values)
      navigate(`/ingredients/${id}`)
    } catch (error) {
      console.error('수정 실패:', error)
      alert('수정에 실패했어요. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
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

  const {
    productName,
    ingredientName,
    categoryId,
    quantity,
    unit,
    purchaseDate,
    expiryDate,
    storage,
    imageUrl,
  } = ingredient

  return (
    <IngredientForm
      initialValues={{
        productName,
        ingredientName,
        categoryId,
        quantity,
        unit,
        purchaseDate,
        expiryDate,
        storage,
        imageUrl,
      }}
      onSubmit={handleSubmit}
      submitLabel="수정하기"
      isSubmitting={isSubmitting}
    />
  )
}

export default IngredientEditPage
