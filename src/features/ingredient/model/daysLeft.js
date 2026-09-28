export const URGENT_DAYS_LIMIT = 5
export function formatDaysLeft(daysLeft) {
  if (daysLeft === 0) return 'D-Day'
  if (daysLeft < 0) return `D+${Math.abs(daysLeft)}`
  return `D-${daysLeft}`
}
export function isUrgent(daysLeft) {
  return daysLeft >= 0 && daysLeft <= URGENT_DAYS_LIMIT
}

// '2026-10-01' 같은 날짜 문자열 → 오늘 기준 남은 일수. 지났으면 음수.
// 백엔드 응답에 daysLeft 가 없을 때 프론트에서 직접 계산한다
export function calcDaysLeft(isoDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const target = new Date(isoDate)
  target.setHours(0, 0, 0, 0)

  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}
