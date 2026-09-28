import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BottomBar from '../../../components/layout/BottomBar'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import useScanStore from '../../../stores/useScanStore'
import { createIngredient } from '../../ingredient/api/ingredientApi'
import { findCategoryIdByName } from '../../ingredient/model/categoryMap'
import { todayIso } from '../../ingredient/model/date'
import OcrProductConfirmModal from '../ui/OcrProductConfirmModal'
import ScanResultCard from '../ui/ScanResultCard'

// 스토어에 있는 인식 결과 1건 → 카드에서 편집할 폼 값 1건
function toFormItem(result, index) {
  return {
    id: index,
    photoUrl: result.photo ? URL.createObjectURL(result.photo) : '',
    productName: result.productName, // OCR 이 읽은 제품명 "한돈 삼겹살 500g"
    ingredientName: result.ingredientName, // 매칭된 재료명 "삼겹살". 카드에서 수정 가능
    categoryId: findCategoryIdByName(result.category),
    quantity: '',
    unit: '개',
    expiryDate: '',
    storage: 'FRIDGE',
  }
}

function validate(items) {
  const errors = {}

  items.forEach((item) => {
    if (!item.ingredientName.trim()) errors[item.id] = '재료명을 입력해주세요'
    else if (!item.categoryId) errors[item.id] = '카테고리를 선택해주세요'
    else if (!item.quantity) errors[item.id] = '수량을 입력해주세요'
    else if (!item.expiryDate) errors[item.id] = '소비기한을 입력해주세요'
  })

  return errors
}

// M07 인식 결과 확인. 카드에서 수정한 뒤 "전체 등록하기"를 누르면 M16 상품명 확인 모달이 뜨고,
// 거기서 "이대로 등록"을 눌러야 실제 등록된다.
function ScanResultPage() {
  const navigate = useNavigate()
  const scanResults = useScanStore((state) => state.scanResults)
  const setScanResults = useScanStore((state) => state.setScanResults)

  const [items, setItems] = useState(() => scanResults.map(toFormItem))
  const [errors, setErrors] = useState({})
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(id, name, value) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [name]: value } : item)))
  }

  function handleRemove(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // "전체 등록하기": 소비기한 검사만 하고, 통과하면 M16 모달을 연다
  function handleSubmit() {
    const nextErrors = validate(items)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsConfirmOpen(true)
  }

  // M16 "이대로 등록": 카드 수만큼 등록 API 를 동시에 호출한다.
  // 일괄 등록 API 가 없어서 단건 POST 를 Promise.all 로 묶었다. 하나라도 실패하면 catch 로 떨어진다
  async function handleConfirm() {
    setIsSubmitting(true)

    try {
      await Promise.all(
        items.map((item) => createIngredient({ ...item, purchaseDate: todayIso() })),
      )

      setScanResults([])
      navigate('/ingredients')
    } catch (error) {
      console.error('등록 실패:', error)
      alert('등록에 실패했어요. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 px-5 py-20">
        <p className="text-sm text-gray-500">인식된 재료가 없어요</p>
        <Button variant="outline" onClick={() => navigate('/scan')}>
          다시 촬영하기
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-col gap-3 px-5 py-4">
        <p className="text-[13px] text-gray-500">
          이름·카테고리는 AI가 자동으로 인식했어요.{' '}
          <span className="font-medium text-red-500">소비기한</span>을 입력해주세요.
        </p>

        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <ScanResultCard
                item={item}
                error={errors[item.id]}
                onChange={handleChange}
                onRemove={handleRemove}
              />
            </li>
          ))}
        </ul>

        <Button variant="secondary" className="w-full" onClick={() => navigate('/scan')}>
          <Icon name="refresh" className="size-4" />
          다시 촬영하기
        </Button>
      </div>

      <BottomBar>
        <Button className="w-full" onClick={handleSubmit}>
          전체 등록하기
        </Button>
      </BottomBar>

      <OcrProductConfirmModal
        isOpen={isConfirmOpen}
        products={items}
        onRetry={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default ScanResultPage
