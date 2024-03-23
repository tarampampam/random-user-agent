import type React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '~/theme/app.scss'

const App = (): React.JSX.Element => {
  console.log('Hello from the popup page!')

  return <></>
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
