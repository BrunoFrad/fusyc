import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Player from "./pages/player/Player"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Player />
  </StrictMode>,
)
