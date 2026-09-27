// '2026-09-17' → '2026. 09. 17' (M09 상세 표시용). 값이 없으면 '-'
export function formatDate(isoDate) {
  if (!isoDate) return '-'

  const [year, month, day] = isoDate.split('-')
  return `${year}. ${month}. ${day}`
}
