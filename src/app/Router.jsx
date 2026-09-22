import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IngredientsPage from '../pages/IngredientsPage.jsx'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* test */}
        <Route path="/test" element={<IngredientsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
