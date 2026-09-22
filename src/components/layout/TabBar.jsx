import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/home', label: '홈' },
  { to: '/ingredients', label: '내 식재료' },
  { to: '/mypage', label: '마이페이지' },
]

function TabBar() {
  return (
    <nav className="flex shrink-0 border-b border-gray-100">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          //   현재 주소와 자기 to 를 비교해서 isActive 를 계산한다
          className={({ isActive }) =>
            isActive
              ? 'flex-1 border-b-2 border-green-800 py-3 text-center text-sm font-bold text-green-800'
              : 'flex-1 border-b-2 border-transparent py-3 text-center text-sm text-gray-400'
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default TabBar
