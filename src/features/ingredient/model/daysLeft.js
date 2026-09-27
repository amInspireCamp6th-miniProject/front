export const URGENT_DAYS_LIMIT = 5
export function formatDaysLeft(daysLeft) {
  if (daysLeft === 0) return 'D-Day'
  if (daysLeft < 0) return `D+${Math.abs(daysLeft)}`
  return `D-${daysLeft}`
}
export function isUrgent(daysLeft) {
  return daysLeft >= 0 && daysLeft <= URGENT_DAYS_LIMIT
}
