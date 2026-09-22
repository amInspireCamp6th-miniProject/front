import { createBrowserRouter } from 'react-router-dom'

import HomePage from '../features/home/page/HomePage'
import IngredientDetailPage from '../features/ingredient/page/IngredientDetailPage'
import IngredientEditPage from '../features/ingredient/page/IngredientEditPage'
import IngredientFormPage from '../features/ingredient/page/IngredientFormPage'
import IngredientListPage from '../features/ingredient/page/IngredientListPage'
import IngredientNewPage from '../features/ingredient/page/IngredientNewPage'
import ScanPage from '../features/ocr/page/ScanPage'
import ScanResultPage from '../features/ocr/page/ScanResultPage'
import LandingPage from '../features/user/page/LandingPage'
import LoginPage from '../features/user/page/LoginPage'
import MyPage from '../features/user/page/MyPage'
import SignupPage from '../features/user/page/SignupPage'
import TabBarLayout from '../components/layout/TabBarLayout'
import SubLayout from '../components/layout/SubLayout'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    element: <TabBarLayout />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/ingredients', element: <IngredientListPage /> },
      { path: '/mypage', element: <MyPage /> },
    ],
  },
  {
    element: <SubLayout />,
    children: [
      {
        path: '/ingredients/new',
        element: <IngredientNewPage />,
        handle: {
          title: '식재료 등록',
        },
      },
      {
        path: '/ingredients/new/form',
        element: <IngredientFormPage />,
        handle: { title: '식재료 등록' },
      },
      {
        path: '/ingredients/:id',
        element: <IngredientDetailPage />,
        handle: { title: '식재료 상세' },
      },
      {
        path: '/ingredients/:id/edit',
        element: <IngredientEditPage />,
        handle: { title: '식재료 수정' },
      },
      { path: '/scan', element: <ScanPage />, handle: { title: '카메라로 등록' } },
      { path: '/scan/result', element: <ScanResultPage />, handle: { title: '인식 결과 확인' } },
    ],
  },
])

export default router
