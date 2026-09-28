import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Spinner from '../../../components/ui/Spinner'
import { updateIngredient, updateIngredientImage } from '../api/ingredientApi'
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

    // 글자 정보는 PATCH 로, 사진은 새로 골랐을 때만 별도 엔드포인트로 보낸다.
    // 두 요청이라 어느 쪽이 실패했는지 알림을 나눈다. 서버가 message 를 주면 그걸 우선 보여준다
    try {
      await updateIngredient(id, values)
    } catch (error) {
      console.error('수정 실패:', error)
      alert(error.response?.data?.message ?? '수정에 실패했어요. 다시 시도해주세요.')
      setIsSubmitting(false)
      return
    }

    if (values.photo) {
      try {
        await updateIngredientImage(id, values.photo)
      } catch (error) {
        // 글자 정보는 이미 저장됐으니 상세로 넘어가되, 사진만 안 바뀐 걸 알려준다
        console.error('사진 교체 실패:', error)
        alert(
          error.response?.data?.message ??
            `정보는 수정됐지만 사진 교체에 실패했어요. (${error.response?.status ?? '네트워크 오류'})`,
        )
      }
    }

    setIsSubmitting(false)
    // replace: 수정 화면을 히스토리에서 지워서, 상세에서 뒤로가기하면 수정 화면이 아니라 목록으로 간다
    navigate(`/ingredients/${id}`, { replace: true })
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
