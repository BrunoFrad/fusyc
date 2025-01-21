import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import NeedLogin from './pages/NeedLogin/NeedLogin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NeedLogin />
  </StrictMode>,
)
