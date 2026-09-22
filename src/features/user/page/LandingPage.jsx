import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 p-5">
      <p className="mb-auto pt-20 text-center text-sm text-gray-400">랜딩 화면 자리</p>

      <Link
        to="/login"
        className="block rounded-lg bg-green-800 py-3 text-center text-sm text-white"
      >
        로그인
      </Link>

      <Link to="/signup" className="block rounded-lg bg-gray-100 py-3 text-center text-sm">
        회원가입
      </Link>

      <Link to="/home" className="block py-1 text-center text-xs text-gray-400 underline">
        둘러보기
      </Link>
    </div>
  )
}

export default LandingPage
