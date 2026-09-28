import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/Button'
import Field from '../../../components/ui/Field'
import Input from '../../../components/ui/Input'
import useAuthStore from '../../../stores/useAuthStore'
import { login } from '../api/authApi'
import { toFormErrors } from '../model/authError'
import AuthLayout from '../ui/AuthLayout'

function validate(values) {
  const errors = {}

  if (!values.email.trim()) errors.email = '이메일을 입력해주세요'
  if (!values.password) errors.password = '비밀번호를 입력해주세요'

  return errors
}

// 로그인. 성공하면 토큰·회원 정보를 저장하고 홈으로 간다
function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const [values, setValues] = useState({ email: '', password: '' })
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
      const { accessToken, user } = await login(values)
      setAuth({ accessToken, user })
      // replace: 뒤로가기로 로그인 화면에 되돌아오지 않게 히스토리에서 지운다
      navigate('/home', { replace: true })
    } catch (error) {
      setErrors(toFormErrors(error, '로그인에 실패했어요. 다시 시도해주세요.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="로그인" description="가입한 이메일과 비밀번호를 입력해주세요.">
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
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            placeholder="비밀번호"
            hasError={Boolean(errors.password)}
          />
        </Field>

        {errors.form && (
          <p role="alert" className="text-sm text-red-500">
            {errors.form}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
          <p className="text-center text-sm text-gray-500">
            아직 계정이 없나요?{' '}
            <Link to="/signup" replace className="font-medium text-green-700 underline">
              회원가입
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
