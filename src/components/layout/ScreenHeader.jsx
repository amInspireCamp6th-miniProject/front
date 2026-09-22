import { useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'

function ScreenHeader({ title }) {
  const navigate = useNavigate()

  return (
    <div className="h-[52px] flex items-center px-2 border-b border-line shrink-0">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="w-8 h-8 flex items-center justify-center"
      >
        <Icon name="chevronLeft" />
      </button>
      <p className="flex-1 text-center text-[17px] font-bold text-ink -ml-8">{title}</p>
    </div>
  )
}

export default ScreenHeader
