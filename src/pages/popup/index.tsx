import React, { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header/component'
import ActiveUserAgent from './components/active-user-agent/component'
import EnabledOnDomain from './components/enabled-on-domain/component'
import QuickSelect, { type QuickSelectChangeHandler } from './components/quick-select/component'
import Actions from './components/actions/component'
import Feedback from './components/feedback/component'
import Footer from './components/footer/component'
import './index.scss'

const App = (): React.JSX.Element => {
  const [enabled, setEnabled] = useState<boolean>(true)
  const [userAgent] = useState<string>()

  const handleQuickSelectChange: QuickSelectChangeHandler = ({ mobile, desktop }) => {
    console.log('QuickSelect changed', { mobile, desktop })
  }

  return (
    <>
      <Header enabled={enabled} onPauseResumeClick={setEnabled} />
      <ActiveUserAgent userAgent={userAgent} />
      <EnabledOnDomain onChange={(v) => console.log('EnabledOnDomain changed', v)} />
      <QuickSelect onChange={handleQuickSelectChange} />
      <Actions />
      <Feedback />
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
