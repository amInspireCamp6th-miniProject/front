// File 객체 → 순수 base64 문자열 '/9j/4AAQ...' (접두어 없음).
// 백엔드가 byte[] 로 받아서, Jackson 이 base64 문자열을 바이트로 자동 변환한다.
// 'data:image/jpeg;base64,' 접두어가 붙어 있으면 변환에 실패하니 떼고 보낸다
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

// 백엔드에서 온 순수 base64 → <img src> 에 넣을 수 있게 접두어를 붙인다.
// 이미 'data:...' 나 'http...' 로 시작하면 그대로 쓴다
export function toImageSrc(value) {
  if (!value) return ''
  if (value.startsWith('data:') || value.startsWith('http')) return value

  return `data:image/jpeg;base64,${value}`
}

// <img src> 용 값 → 요청용 순수 base64. 수정(PATCH) 때 조회한 값을 되돌려 보내는 데 쓴다.
// 사진이 없으면 null
export function toBase64Only(value) {
  if (!value) return null
  if (value.startsWith('data:')) return value.split(',')[1]

  return value
}
