// 서버 에러 응답 → 폼에 보여줄 에러.
// 서버 공통 에러 모양: { code, message, errors?: [{ field, reason }] }
// - 400 검증 실패면 errors 를 필드별로 풀어서 { email: '...', password: '...' } 로 만든다
// - 그 외(401, 409 등)는 message 하나를 form 키에 담아서 폼 아래에 한 줄로 보여준다
export function toFormErrors(error, fallback) {
  const data = error.response?.data

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return Object.fromEntries(data.errors.map(({ field, reason }) => [field, reason]))
  }

  return { form: data?.message ?? fallback }
}
