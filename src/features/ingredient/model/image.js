// File 객체 → 'data:image/jpeg;base64,/9j/4AAQ...' 문자열.
// 백엔드가 사진을 base64 문자열 그대로 DB 에 넣기로 해서, JSON 에 담을 수 있게 글자로 바꾼다
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

// 백엔드에서 온 이미지 값을 <img src> 에 바로 넣을 수 있는 형태로 맞춘다.
// 'data:...' 나 'http...' 면 그대로, 순수 base64 만 오면 접두어를 붙인다
export function toImageSrc(value) {
  if (!value) return ''
  if (value.startsWith('data:') || value.startsWith('http')) return value

  return `data:image/jpeg;base64,${value}`
}
