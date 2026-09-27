import { useNavigate } from 'react-router-dom'

import ChoiceCard from '../../../components/ui/ChoiceCard'

// M04 등록 방법 선택
function IngredientNewPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 px-5 py-8">
      <ChoiceCard
        icon="camera"
        title="카메라로 촬영"
        description="사진 한 장으로 AI가 식재료를 인식해요"
        variant="brand"
        onClick={() => navigate('/scan')}
      />
      <ChoiceCard
        icon="pencil"
        title="직접 입력"
        description="이름, 수량, 소비기한을 직접 입력해요"
        onClick={() => navigate('/ingredients/new/form')}
      />
    </div>
  )
}

export default IngredientNewPage
