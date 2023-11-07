import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import { App } from './App'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
