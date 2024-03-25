import React, { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header/component'
import ActiveUserAgent from './components/active-user-agent/component'
import EnabledOnDomain from './components/enabled-on-domain/component'
import QuickSelect from './components/quick-select/component'
import Actions from './components/actions/component'
import Feedback from './components/feedback/component'
import Footer from './components/footer/component'
import './index.scss'
import detectBrowser from '~/shared/detect-browser'

const storeUrl = ((): string | undefined => {
  switch (detectBrowser()) {
    case 'chrome':
      return 'https://chrome.google.com/webstore/detail/random-user-agent/einpaelgookohagofgnnkcfjbkkgepnp/reviews'
    case 'firefox':
      return 'https://addons.mozilla.org/firefox/addon/random_user_agent/reviews/'
    case 'opera':
      return 'https://addons.opera.com/extensions/details/random-user-agent/'
    case 'edge':
      return 'https://microsoftedge.microsoft.com/addons/detail/random-useragent/addfjgllfhpnacoahmmcafmaacjloded'
  }
})()

const App = (): React.JSX.Element => {
  const [version, setVersion] = useState<string>()
  const [enabled, setEnabled] = useState<boolean>(true)
  const [userAgent] = useState<string>()

  useEffect(() => {
    setVersion('0.0.0')
  }, [])

  return (
    <>
      <Header
        isExtensionEnabled={enabled}
        onPauseResumeClick={(v) => {
          console.log('Pause/Resume clicked', v)
          setEnabled(v)
        }}
      />
      <ActiveUserAgent userAgent={userAgent} />
      <EnabledOnDomain onChange={(v) => console.log('EnabledOnDomain changed', v)} />
      <QuickSelect onChange={({ mobile, desktop }) => console.log('QuickSelect changed', { mobile, desktop })} />
      <Actions
        isExtensionEnabled={enabled}
        onPauseResumeClick={(v) => {
          console.log('Pause/Resume (actions) clicked', v)
          setEnabled(v)
        }}
        onRefreshClick={() => console.log('Refresh clicked')}
        onOpenOptionsClick={() => console.log('Open Options clicked')}
      />
      <Feedback onRateLinkClick={() => console.log('Rate link clicked', storeUrl)} />
      <Footer version={version} onBugReportClick={() => console.log('Bug report clicked')} />
    </>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
