import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Invite from './pages/Invite'
import Index from './pages/Index'

const router = createBrowserRouter([
  { path: '/:name', element: <Index /> },
  { path: '/invite/:name', element: <Invite /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)