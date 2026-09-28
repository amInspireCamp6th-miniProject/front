import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BottomBar from '../../../components/layout/BottomBar'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import useScanStore from '../../../stores/useScanStore'
import { findCategoryIdByName } from '../../ingredient/model/categoryMap'
import OcrProductConfirmModal from '../ui/OcrProductConfirmModal'
import ScanResultCard from '../ui/ScanResultCard'

// 스토어에 있는 인식 결과 1건 → 카드에서 편집할 폼 값 1건
function toFormItem(result, index) {
  return {
    id: index,
    photoUrl: result.photo ? URL.createObjectURL(result.photo) : '',
    ocrText: result.productName,
    productName: result.ingredientName,
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
    if (!item.expiryDate) errors[item.id] = '소비기한을 입력해주세요'
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

  // M16 "이대로 등록": 실제 등록
  function handleConfirm() {
    const payload = items.map(
      ({ productName, categoryId, quantity, unit, expiryDate, storage }) => ({
        productName,
        categoryId: Number(categoryId),
        quantity: Number(quantity),
        unit,
        expiryDate,
        storage,
      }),
    )
    // TODO: 등록 API 연결 (createIngredients)
    console.log('전체 등록 요청:', payload)

    setScanResults([])
    navigate('/ingredients')
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
      />
    </div>
  )
}

export default ScanResultPage
