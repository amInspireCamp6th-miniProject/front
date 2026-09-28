import { useState } from 'react'

import BottomBar from '../../../components/layout/BottomBar'
import Button from '../../../components/ui/Button'
import Field from '../../../components/ui/Field'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import { INGREDIENT_CATEGORY } from '../model/categoryMap'
import { UNIT_OPTIONS } from '../model/unit'
import StorageSelector from './StorageSelector'

const CATEGORY_OPTIONS = Object.entries(INGREDIENT_CATEGORY).map(([value, { name }]) => ({
  value,
  label: name,
}))

const EMPTY_VALUES = {
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
  if (!values.purchaseDate) errors.purchaseDate = '구매일을 입력해주세요'
  if (!values.expiryDate) errors.expiryDate = '소비기한을 입력해주세요'

  return errors
}

// 등록(M08)과 수정(M10)이 같이 쓰는 폼. 초깃값과 제출 버튼 글자만 다르다.
function IngredientForm({ initialValues, onSubmit, submitLabel, isSubmitting = false }) {
  const [values, setValues] = useState({ ...EMPTY_VALUES, ...initialValues })
  const [errors, setErrors] = useState({})

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  // Input, Select 는 이벤트로 오니까 name/value 를 꺼내서 handleChange 로 넘긴다
  function handleInputChange(event) {
    handleChange(event.target.name, event.target.value)
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
          <Field label="수량" htmlFor="quantity">
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              inputMode="numeric"
              value={values.quantity}
              onChange={handleInputChange}
              placeholder="10"
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
