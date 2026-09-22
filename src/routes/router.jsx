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

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },

  { path: '/home', element: <HomePage /> },
  { path: '/ingredients', element: <IngredientListPage /> },
  { path: '/mypage', element: <MyPage /> },

  { path: '/ingredients/new', element: <IngredientNewPage /> },
  { path: '/ingredients/new/form', element: <IngredientFormPage /> },
  { path: '/ingredients/:id', element: <IngredientDetailPage /> },
  { path: '/ingredients/:id/edit', element: <IngredientEditPage /> },
  { path: '/scan', element: <ScanPage /> },
  { path: '/scan/result', element: <ScanResultPage /> },
])

export default router
