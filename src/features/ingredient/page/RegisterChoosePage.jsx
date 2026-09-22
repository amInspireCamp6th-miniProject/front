import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../../components/layout/ScreenHeader'
import ChoiceCard from '../ui/ChoiceCard'

function RegisterChoosePage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScreenHeader title="식재료 등록" />
      <div className="flex-1 px-5 pt-8 flex flex-col gap-4">
        <ChoiceCard
          icon="camera"
          title="카메라로 촬영"
          description="사진 한 장으로 AI가 식재료를 인식해요"
          onClick={() => navigate('/register/camera')}
        />
        <ChoiceCard
          icon="pencil"
          title="직접 입력"
          description="이름, 수량, 소비기한을 직접 입력해요"
          onClick={() => navigate('/register/manual')}
        />
      </div>
    </div>
  )
}

export default RegisterChoosePage
