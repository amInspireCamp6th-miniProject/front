import { useNavigate } from 'react-router-dom'
import IconButton from '../ui/IconButton'

function PageHeader({ title }) {
  const navigate = useNavigate()
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-gray-100 px-4">
      {/* IconButton 이 이미 <button> 이라 바깥에 또 button 을 두면 클릭이 두 번 처리돼 두 번 뒤로 간다 */}
      <IconButton icon="chevronLeft" aria-label="뒤로가기" onClick={() => navigate(-1)} />
      <h1 className="flex-1 text-center text-lg font-bold">{title}</h1>
      {/* title 중앙정렬용 */}
      <div className="size-5" />
    </header>
  )
}

export default PageHeader
