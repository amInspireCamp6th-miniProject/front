import { useRef, useState } from 'react'

import BottomBar from '../../../components/layout/BottomBar'
import Button from '../../../components/ui/Button'
import Field from '../../../components/ui/Field'
import Icon from '../../../components/ui/Icon'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Thumb from '../../../components/ui/Thumb'
import useObjectUrl from '../../../hooks/useObjectUrl'
import useImageObjectUrl from '../hooks/useImageObjectUrl'
import { INGREDIENT_CATEGORY } from '../model/categoryMap'
import { IMAGE_RULE_MESSAGE, isValidImageFile } from '../model/image'
import { UNIT_OPTIONS } from '../model/unit'
import StorageSelector from './StorageSelector'

const CATEGORY_OPTIONS = Object.entries(INGREDIENT_CATEGORY).map(([value, { name }]) => ({
  value,
  label: name,
}))

const EMPTY_VALUES = {
  photo: null, // 새로 고른 사진 File. 등록은 사진 없이, 수정은 기존 사진 그대로 간다
  imageUrl: null, // 수정(M10)일 때 이미 저장된 사진 주소. 새 사진을 안 고르면 이걸 미리보기로 쓴다
  productName: '',
  ingredientName: '',
  categoryId: '',
  quantity: '',
  unit: '개',
  purchaseDate: '',
  expiryDate: '',
  storage: 'FRIDGE',
}

function validate(values) {
  const errors = {}

  if (!values.productName.trim()) errors.productName = '이름을 입력해주세요'
  if (!values.ingredientName.trim()) errors.ingredientName = '재료명을 입력해주세요'
  if (!values.categoryId) errors.categoryId = '카테고리를 선택해주세요'
  if (!(Number(values.quantity) > 0)) errors.quantity = '수량은 0보다 커야 해요'
  if (!values.purchaseDate) errors.purchaseDate = '구매일을 입력해주세요'
  if (!values.expiryDate) errors.expiryDate = '소비기한을 입력해주세요'

  return errors
}

// 등록(M08)과 수정(M10)이 같이 쓰는 폼. 초깃값과 제출 버튼 글자만 다르다.
function IngredientForm({ initialValues, onSubmit, submitLabel, isSubmitting = false }) {
  const [values, setValues] = useState({ ...EMPTY_VALUES, ...initialValues })
  const [errors, setErrors] = useState({})
  const photoInputRef = useRef(null)

  // 새로 고른 File 을 <img src> 에 넣을 임시 URL 로 바꾼다. File 이 바뀔 때만 다시 만든다
  // 기존 useMemo는 URL을 생성하기만 하고 해제하지 않아, 새 사진 선택이 반복되면 메모리가 남을 수 있었다.
  // 공용 훅으로 대체해 File이 바뀌거나 폼이 사라질 때 Object URL을 반납한다.
  const newPhotoUrl = useObjectUrl(values.photo)
  // 수정일 때 서버에 저장된 기존 사진. 토큰이 필요해서 훅으로 받아온다
  const savedPhotoUrl = useImageObjectUrl(values.imageUrl)
  // 새 사진이 있으면 그걸, 없으면 기존 사진을 보여준다
  const photoUrl = newPhotoUrl || savedPhotoUrl

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  // Input, Select 는 이벤트로 오니까 name/value 를 꺼내서 handleChange 로 넘긴다
  function handleInputChange(event) {
    handleChange(event.target.name, event.target.value)
  }

  // 파일 input 은 value 가 아니라 files 에 File 이 담긴다. 검사 통과한 것만 상태에 넣는다.
  // input.value 를 비워야 같은 파일을 다시 골라도 change 이벤트가 난다
  function handlePhotoChange(event) {
    const file = event.target.files[0]
    event.target.value = ''
    if (!file) return

    if (!isValidImageFile(file)) {
      alert(IMAGE_RULE_MESSAGE)
      return
    }

    handleChange('photo', file)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      ...values,
      categoryId: Number(values.categoryId),
      quantity: Number(values.quantity),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex min-h-full flex-col">
      <div className="flex flex-col gap-5 px-5 py-6">
        {/* 사진은 선택 사항. 수정에서는 새 사진을 고른 경우에만 서버 사진이 바뀐다 */}
        <Field label="사진 (선택)">
          <div className="flex items-center gap-4">
            <Thumb src={photoUrl} size="lg" />
            <div className="flex flex-col items-start gap-2">
              <Button variant="outline" onClick={() => photoInputRef.current.click()}>
                <Icon name="camera" className="size-4" />
                {photoUrl ? '다른 사진 선택' : '사진 선택'}
              </Button>
              {values.photo && (
                <Button variant="ghost" onClick={() => handleChange('photo', null)}>
                  선택 취소
                </Button>
              )}
            </div>
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </Field>

        <Field label="이름" htmlFor="productName" error={errors.productName}>
          <Input
            id="productName"
            name="productName"
            value={values.productName}
            onChange={handleInputChange}
            placeholder="예: 계란"
            hasError={Boolean(errors.productName)}
          />
        </Field>

        {/* 레시피 추천이 재료명으로 매칭하니 제품명과 따로 받는다 (예: "서울우유 1L" → "우유") */}
        <Field label="재료명" htmlFor="ingredientName" error={errors.ingredientName}>
          <Input
            id="ingredientName"
            name="ingredientName"
            value={values.ingredientName}
            onChange={handleInputChange}
            placeholder="예: 우유"
            hasError={Boolean(errors.ingredientName)}
          />
        </Field>

        <Field label="카테고리" htmlFor="categoryId" error={errors.categoryId}>
          <Select
            id="categoryId"
            name="categoryId"
            value={values.categoryId}
            onChange={handleInputChange}
            options={CATEGORY_OPTIONS}
            placeholder="카테고리 선택"
            hasError={Boolean(errors.categoryId)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="수량" htmlFor="quantity" error={errors.quantity}>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={values.quantity}
              onChange={handleInputChange}
              placeholder="10"
              hasError={Boolean(errors.quantity)}
            />
          </Field>
          <Field label="단위" htmlFor="unit">
            <Select
              id="unit"
              name="unit"
              value={values.unit}
              onChange={handleInputChange}
              options={UNIT_OPTIONS}
            />
          </Field>
        </div>

        <Field label="구매일" htmlFor="purchaseDate" error={errors.purchaseDate}>
          <Input
            id="purchaseDate"
            name="purchaseDate"
            type="date"
            value={values.purchaseDate}
            onChange={handleInputChange}
            hasError={Boolean(errors.purchaseDate)}
          />
        </Field>

        <Field label="소비기한" htmlFor="expiryDate" error={errors.expiryDate}>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={values.expiryDate}
            onChange={handleInputChange}
            hasError={Boolean(errors.expiryDate)}
          />
        </Field>

        <Field label="보관상태">
          <StorageSelector
            value={values.storage}
            onChange={(storage) => handleChange('storage', storage)}
          />
        </Field>
      </div>

      <BottomBar>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '처리 중...' : submitLabel}
        </Button>
      </BottomBar>
    </form>
  )
}

export default IngredientForm
