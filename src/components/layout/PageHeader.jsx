import { useNavigate } from 'react-router-dom'
import chevronLeft from '../../assets/icons/chevron-left.svg'

function PageHeader({ title }) {
  const navigate = useNavigate()
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-gray-100 px-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로 가기"
        className="flex size-5 items-center justify-center rounded-full hover:bg-gray-100"
      >
        <img src={chevronLeft} alt="뒤로가기" width="20" height="20" />
      </button>
      <h1 className="flex-1 text-center text-lg font-bold">{title}</h1>
      {/* title 중앙정렬용 */}
      <div className="size-5" />
    </header>
  )
}

export default PageHeader
