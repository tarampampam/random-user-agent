import type React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'

const App = (): React.JSX.Element => {
  console.log('Hello from the options page!')

  return <></>
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
