import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegisterChoosePage from './features/ingredient/page/RegisterChoosePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterChoosePage />} />
        <Route path="/register/camera" element={<p>M05 카메라 화면 (준비 중)</p>} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  )
}
