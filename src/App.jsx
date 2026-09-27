import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'

function App() {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col bg-white">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
