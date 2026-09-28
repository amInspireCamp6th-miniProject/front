import { Navigate, useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/Button'
import useAuthStore from '../../../stores/useAuthStore'

// M01 랜딩. 이미 로그인돼 있으면 바로 홈으로 보낸다
function LandingPage() {
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)

  if (accessToken) return <Navigate to="/home" replace />

  return (
    <div className="flex h-full flex-col bg-gray-950 bg-[radial-gradient(circle_at_50%_35%,rgba(22,101,52,0.45),transparent_60%)] px-5 pb-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <p className="text-sm font-medium tracking-[0.3em] text-green-200/70">FRIDGE RECIPE</p>
        <h1 className="text-4xl leading-snug font-bold text-white">
          냉장고 속 재료로,
          <br />
          오늘의 한 끼
        </h1>
        <p className="leading-relaxed text-gray-400">
          버려지는 식재료 없이,
          <br />더 맛있는 오늘을 만들어요
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={() => navigate('/login')}>로그인</Button>
        <Button variant="dark" onClick={() => navigate('/signup')}>
          회원가입
        </Button>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          둘러보기
        </Button>
      </div>
    </div>
  )
}

export default LandingPage
