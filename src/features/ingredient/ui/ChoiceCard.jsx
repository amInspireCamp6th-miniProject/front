import Icon from '../../../components/ui/Icon'

function ChoiceCard({ icon, title, description, onClick, variant = 'muted' }) {
  const iconColor = variant === 'brand' ? 'bg-green-50 text-green-800' : 'bg-gray-100 text-gray-500'
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-gray-200 p-5 flex items-center gap-4 text-left hover:bg-gray-50"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-bold text-gray-900">{title}</p>
        <p className="text-[13px] text-gray-500 mt-0.5">{description}</p>
      </div>
      <Icon name="chevronRight" className="h-5 w-5 text-gray-400" />
    </button>
  )
}

export default ChoiceCard
