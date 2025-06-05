import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './AppLayout.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Browse from './components/Browse.jsx'
import Signin from './components/Signin.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
    {
      path:"",
      element:<Signin />
    },
    {
      path:"/browse",
      element:<Browse />
    }
  ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
