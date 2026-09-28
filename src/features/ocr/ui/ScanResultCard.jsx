import Icon from '../../../components/ui/Icon'
import IconButton from '../../../components/ui/IconButton'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Thumb from '../../../components/ui/Thumb'
import { INGREDIENT_CATEGORY } from '../../ingredient/model/categoryMap'
import { UNIT_OPTIONS } from '../../ingredient/model/unit'
import StorageSelector from '../../ingredient/ui/StorageSelector'

const CATEGORY_OPTIONS = Object.entries(INGREDIENT_CATEGORY).map(([value, { name }]) => ({
  value,
  label: name,
}))

// M07 카메라 인식 결과 1건. 재료명·카테고리는 AI가 채워 오고, 수량·소비기한은 사용자가 입력한다.
// 값은 부모(ScanResultPage)가 들고 있고, 바뀌면 onChange(id, 이름, 값)으로 알려준다.
function ScanResultCard({ item, error, onChange, onRemove }) {
  const {
    id,
    photoUrl,
    productName,
    ingredientName,
    categoryId,
    quantity,
    unit,
    expiryDate,
    storage,
  } = item

  // OCR 제품명("한돈 삼겹살 500g")과 매칭된 재료명("삼겹살")이 다를 때만 안내 문구를 보여준다
  const isMatched = productName && productName !== ingredientName

  function handleInputChange(event) {
    onChange(id, event.target.name, event.target.value)
  }

  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-gray-200 bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 py-0.5 pr-2.5 pl-2 text-[11px] font-medium text-green-700">
          <Icon name="check" className="size-3" />
          AI 인식됨
        </span>
        <IconButton icon="x" aria-label="이 재료 빼기" onClick={() => onRemove(id)} />
      </div>

      {isMatched && (
        <p className="text-xs text-gray-400">
          OCR "{productName}" → "{ingredientName}"로 자동 매칭됨
        </p>
      )}

      <div className="flex items-center gap-2">
        <Thumb src={photoUrl} />
        <Input
          name="productName"
          value={productName}
          onChange={handleInputChange}
          placeholder="제품명"
          aria-label="제품명"
          className="min-w-0 flex-1"
        />
        <Select
          name="categoryId"
          value={categoryId}
          onChange={handleInputChange}
          options={CATEGORY_OPTIONS}
          placeholder="카테고리"
          aria-label="카테고리"
          className="w-28 shrink-0"
        />
      </div>

      <div className="flex gap-2">
        <Input
          name="quantity"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={quantity}
          onChange={handleInputChange}
          placeholder="수량"
          aria-label="수량"
          hasError={!quantity}
          className="min-w-0 flex-1"
        />
        <Select
          name="unit"
          value={unit}
          onChange={handleInputChange}
          options={UNIT_OPTIONS}
          aria-label="단위"
          className="w-24 shrink-0"
        />
      </div>

      <Input
        name="expiryDate"
        type="date"
        value={expiryDate}
        onChange={handleInputChange}
        hasError={!expiryDate}
        aria-label="소비기한"
      />
      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}

      <p className="text-xs text-gray-400">AI가 추정한 보관 방법이에요. 다르면 눌러서 바꿔주세요</p>
      <StorageSelector value={storage} onChange={(value) => onChange(id, 'storage', value)} />
    </div>
  )
}

export default ScanResultCard
