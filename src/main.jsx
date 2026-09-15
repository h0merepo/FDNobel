import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ON_SURFACE } from './data/edition'
import { watchReach } from './lib/reach'

// Marked on the root element rather than passed down, because what changes on
// the table is the ground the whole document stands on.
if (ON_SURFACE) document.documentElement.classList.add('on-surface')

// A station on the table is already sized to the person sitting at it, so the
// reach only applies to the atlas standing on its own.
if (!ON_SURFACE) watchReach()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
