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
