import ChipGroup from '../../../components/ui/ChipGroup'
import { STORAGE } from '../model/storage'

const OPTIONS = Object.entries(STORAGE).map(([value, { label }]) => ({ value, label }))

// 냉장/냉동/실온 중 하나 고르기 (M07 M08 M10). 선택지가 STORAGE로 고정된 ChipGroup
function StorageSelector({ value, onChange }) {
  return (
    <ChipGroup
      options={OPTIONS}
      value={value}
      onChange={onChange}
      variant="segment"
      aria-label="보관상태"
    />
  )
}

export default StorageSelector
