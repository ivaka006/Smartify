import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
//temporary 
import Login from './components/Login/login.jsx'
import Register from './components/Register/Register.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  {path: "/about", element: <About />},
  {path: "/contact", element: <Contact />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
