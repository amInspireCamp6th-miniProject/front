import { useRef, useState } from 'react'

import BottomBar from '../../../components/layout/BottomBar'
import Button from '../../../components/ui/Button'
import Field from '../../../components/ui/Field'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import { INGREDIENT_CATEGORY } from '../model/categoryMap'
import { UNIT_OPTIONS } from '../model/unit'
import StorageSelector from './StorageSelector'
import Icon from '../../../components/ui/Icon'

const CATEGORY_OPTIONS = Object.entries(INGREDIENT_CATEGORY).map(([value, { name }]) => ({
  value,
  label: name,
}))

const EMPTY_VALUES = {
  productName: '',
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
  if (!values.categoryId) errors.categoryId = '카테고리를 선택해주세요'
  if (!values.expiryDate) errors.expiryDate = '소비기한을 입력해주세요'

  return errors
}

// 등록(M08)과 수정(M10)이 같이 쓰는 폼. 초깃값과 제출 버튼 글자만 다르다.
function IngredientForm({ initialValues, onSubmit, submitLabel }) {
  const [values, setValues] = useState({ ...EMPTY_VALUES, ...initialValues })
  const [errors, setErrors] = useState({})
  const [photoFile, setPhotoFile] = useState(null)
  const photoInputRef = useRef(null)

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  // Input, Select 는 이벤트로 오니까 name/value 를 꺼내서 handleChange 로 넘긴다
  function handleInputChange(event) {
    handleChange(event.target.name, event.target.value)
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (file) setPhotoFile(file)
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
        <Field label="사진">
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <button
            type="button"
            onClick={() => photoInputRef.current.click()}
            className="flex h-52 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400"
          >
            {photoFile ? (
              <img
                src={URL.createObjectURL(photoFile)}
                alt="선택한 사진"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <>
                <Icon name="camera" className="h-6 w-6" />
                <span className="text-[11px]">사진 추가</span>
              </>
            )}
          </button>
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

        <Field label="구매일" htmlFor="purchaseDate">
          <Input
            id="purchaseDate"
            name="purchaseDate"
            type="date"
            value={values.purchaseDate}
            onChange={handleInputChange}
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
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </BottomBar>
    </form>
  )
}

export default IngredientForm
