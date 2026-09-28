// 사진 파일 제한. 백엔드 OcrImageValidator 와 같은 값 (jpeg/png, 5MB).
// 넘으면 서버가 400 을 주니 보내기 전에 프론트에서 먼저 막는다
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']
export const IMAGE_RULE_MESSAGE = 'JPG 또는 PNG, 5MB 이하 사진만 올릴 수 있어요.'

export function isValidImageFile(file) {
  return ALLOWED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE
}
