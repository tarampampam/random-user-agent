import React, { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header/component'
import './index.scss'

const App = (): React.JSX.Element => {
  const [enabled, setEnabled] = useState<boolean>(true)

  return (
    <Header
      enabled={enabled}
      onPauseResumeClick={(v) => {
        console.log('onPauseResumeClick', v)
        setEnabled(v)
      }}
    />
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
