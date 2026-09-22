import { RouterProvider } from 'react-router-dom'
import router from './routes/router'

function App() {
  return (
    <div className="mx-auto flex h-full max-w flex-col bg-white">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
