import { useNavigate, useParams } from 'react-router-dom'

import defaultImage from '../../../assets/images/ingredient-default.svg'
import BottomBar from '../../../components/layout/BottomBar'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import DetailRow from '../../../components/ui/DetailRow'
import Spinner from '../../../components/ui/Spinner'
import { deleteIngredient } from '../api/ingredientApi'
import useImageObjectUrl from '../hooks/useImageObjectUrl'
import useIngredient from '../hooks/useIngredient'
import { INGREDIENT_CATEGORY } from '../model/categoryMap'
import { formatDate } from '../model/date'
import Dday from '../ui/Dday'
import StorageBadge from '../ui/StorageBadge'

// M09 식재료 상세
function IngredientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ingredient, isLoading } = useIngredient(id)
  // 훅은 조건문(if) 위에서 호출해야 해서, ingredient 가 아직 없을 땐 null 을 넘긴다
  const imageSrc = useImageObjectUrl(ingredient?.imageUrl)

  async function handleDelete() {
    if (!window.confirm('이 식재료를 삭제할까요?')) return

    try {
      await deleteIngredient(id)
      // replace: 삭제된 상세로 뒤로가기해서 돌아오지 않게 히스토리에서 지운다
      navigate('/ingredients', { replace: true })
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제에 실패했어요. 다시 시도해주세요.')
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

  const { productName, categoryId, quantity, unit, purchaseDate, expiryDate, daysLeft, storage } =
    ingredient
  const categoryName = INGREDIENT_CATEGORY[categoryId]?.name

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-col gap-5 px-5 py-6">
        <img
          src={imageSrc || defaultImage}
          alt={productName}
          className="aspect-square w-full rounded-2xl object-cover"
        />

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{productName}</h1>
          {categoryName && <Badge variant="blue">{categoryName}</Badge>}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white px-4">
          <DetailRow label="수량">
            {quantity}
            {unit}
          </DetailRow>
          <DetailRow label="구매일">{formatDate(purchaseDate)}</DetailRow>
          <DetailRow label="소비기한">{formatDate(expiryDate)}</DetailRow>
          <DetailRow label="남은 소비기한">
            <Dday daysLeft={daysLeft} />
          </DetailRow>
          <DetailRow label="보관상태">
            <StorageBadge storage={storage} />
          </DetailRow>
        </div>
      </div>

      <BottomBar>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => navigate(`/ingredients/${id}/edit`)}
        >
          수정
        </Button>
        <Button variant="danger" className="flex-1" onClick={handleDelete}>
          삭제
        </Button>
      </BottomBar>
    </div>
  )
}

export default IngredientDetailPage
