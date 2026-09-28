export const INGREDIENT_CATEGORY = {
  1: { name: '채소', icon: '🥬' },
  2: { name: '과일', icon: '🍎' },
  3: { name: '육류', icon: '🥩' },
  4: { name: '수산물', icon: '🐟' },
  5: { name: '유제품', icon: '🥛' },
  6: { name: '가공식품', icon: '🥫' },
}

// OCR 응답은 카테고리를 '육류' 같은 이름으로 주는데, 폼과 Select는 숫자 id를 쓴다. 이름으로 id를 찾는다. 없으면 ''
export function findCategoryIdByName(name) {
  const entry = Object.entries(INGREDIENT_CATEGORY).find(([, category]) => category.name === name)

  return entry ? Number(entry[0]) : ''
}
