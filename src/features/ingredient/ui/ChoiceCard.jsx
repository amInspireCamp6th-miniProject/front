import Icon from '../../../components/ui/Icon'

function ChoiceCard({ icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-line p-5 flex items-center gap-4 text-left hover:bg-surface-subtle"
    >
      <div className="w-12 h-12 rounded-full bg-brand-soft text-brand flex items-center justify-center">
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-bold text-ink">{title}</p>
        <p className="text-[13px] text-ink-secondary mt-0.5">{description}</p>
      </div>
      <Icon name="chevronRight" className="h-5 w-5 text-ink-tertiary" />
    </button>
  )
}

export default ChoiceCard
