import PageHeader from '../../../components/layout/PageHeader'

// 로그인·회원가입 공통 틀. 뒤로가기 헤더 + 안내 문구 + 폼 자리
function AuthLayout({ title, description, children }) {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={title} />
      <main className="flex flex-1 flex-col overflow-y-auto px-5 py-8">
        <p className="mb-6 text-sm text-gray-500">{description}</p>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
