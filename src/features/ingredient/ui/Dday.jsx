import { formatDaysLeft, URGENT_DAYS_LIMIT } from '../model/daysLeft'

function Dday({ daysLeft }) {
  const isRed = daysLeft <= URGENT_DAYS_LIMIT
  return (
    <span className={`shrink-0 text-sm font-semibold ${isRed ? 'text-red-500' : 'text-gray-500'}`}>
      {formatDaysLeft(daysLeft)}
    </span>
  )
}

export default Dday
