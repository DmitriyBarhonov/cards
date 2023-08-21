// eslint-disable-next-line import/order, import/default
import React from 'react'
// eslint-disable-next-line import/order, import/default
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { App } from './App'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
