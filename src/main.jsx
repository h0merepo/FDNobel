import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ON_SURFACE } from './data/edition'

// Marked on the root element rather than passed down, because what changes on
// the table is the ground the whole document stands on.
if (ON_SURFACE) document.documentElement.classList.add('on-surface')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
