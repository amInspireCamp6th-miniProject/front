import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/Button'
import Field from '../../../components/ui/Field'
import Input from '../../../components/ui/Input'
import { signup } from '../api/authApi'
import { toFormErrors } from '../model/authError'
import AuthLayout from '../ui/AuthLayout'

// 백엔드 SignupRequest 의 검증 규칙과 같은 값. 서버에서 400 이 나기 전에 프론트에서 먼저 막는다
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_PATTERN = /^[!-~]{8,64}$/ // 공백 없는 ASCII(영문·숫자·특수문자) 8~64자
const NICKNAME_MAX = 50

function validate(values) {
  const errors = {}

  if (!values.email.trim()) errors.email = '이메일을 입력해주세요'
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = '이메일 형식이 올바르지 않아요'

  if (!values.password) errors.password = '비밀번호를 입력해주세요'
  else if (!PASSWORD_PATTERN.test(values.password))
    errors.password = '공백 없이 영문·숫자·특수문자 8~64자로 입력해주세요'

  if (values.passwordConfirm !== values.password) errors.passwordConfirm = '비밀번호가 서로 달라요'

  if (!values.nickname.trim()) errors.nickname = '닉네임을 입력해주세요'
  else if (values.nickname.length > NICKNAME_MAX)
    errors.nickname = `닉네임은 ${NICKNAME_MAX}자 이하로 입력해주세요`

  return errors
}

// 회원가입. 성공하면 로그인 화면으로 보낸다 (가입 응답에는 토큰이 없어서 자동 로그인은 안 된다)
function SignupPage() {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)

    try {
      await signup(values)
      alert('가입이 완료됐어요. 로그인해주세요.')
      navigate('/login', { replace: true })
    } catch (error) {
      // 409 DUPLICATE_EMAIL 은 이메일 칸 아래에 보여주는 게 자연스럽다
      const formErrors = toFormErrors(error, '회원가입에 실패했어요. 다시 시도해주세요.')
      if (error.response?.data?.code === 'DUPLICATE_EMAIL') {
        setErrors({ email: formErrors.form })
      } else {
        setErrors(formErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="회원가입" description="이메일과 비밀번호, 닉네임을 정해주세요.">
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-5">
        <Field label="이메일" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            hasError={Boolean(errors.email)}
          />
        </Field>

        <Field label="비밀번호" htmlFor="password" error={errors.password}>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            placeholder="영문·숫자·특수문자 8~64자"
            hasError={Boolean(errors.password)}
          />
        </Field>

        <Field label="비밀번호 확인" htmlFor="passwordConfirm" error={errors.passwordConfirm}>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
            value={values.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 한 번 더"
            hasError={Boolean(errors.passwordConfirm)}
          />
        </Field>

        <Field label="닉네임" htmlFor="nickname" error={errors.nickname}>
          <Input
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            maxLength={NICKNAME_MAX}
            value={values.nickname}
            onChange={handleChange}
            placeholder="예: 김냉장"
            hasError={Boolean(errors.nickname)}
          />
        </Field>

        {errors.form && (
          <p role="alert" className="text-sm text-red-500">
            {errors.form}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '가입 중...' : '가입하기'}
          </Button>
          <p className="text-center text-sm text-gray-500">
            이미 계정이 있나요?{' '}
            <Link to="/login" replace className="font-medium text-green-700 underline">
              로그인
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignupPage
