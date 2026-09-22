import { Outlet } from 'react-router-dom'
import AppBar from './AppBar'
import TabBar from './TabBar'

function TabBarLayout() {
  return (
    <>
      <AppBar />
      <TabBar />
      {/* 헤더 부분만 사이즈 고정하고 아래 콘첸츠는 남은 크기 전부 가져감 */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </>
  )
}

export default TabBarLayout
