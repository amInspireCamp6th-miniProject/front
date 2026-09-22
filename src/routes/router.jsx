import { createBrowserRouter } from 'react-router-dom'

import HomePage from '../features/home/page/HomePage'

const router = createBrowserRouter([{ path: '/home', element: <HomePage /> }])

export default router
