// '2026-09-17' → '2026. 09. 17' (M09 상세 표시용). 값이 없으면 '-'
export function formatDate(isoDate) {
  if (!isoDate) return '-'

  const [year, month, day] = isoDate.split('-')
  return `${year}. ${month}. ${day}`
}

// 오늘 → '2026-09-28'. input[type=date] 값과 API 날짜 형식이 같아서 그대로 쓴다
export function todayIso() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
