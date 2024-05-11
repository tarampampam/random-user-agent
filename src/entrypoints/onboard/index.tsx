import type React from 'react'
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { i18n } from '~/i18n'
import { askForPermissions, checkPermissions } from '~/shared/permissions'
import Button from './components/button'
import Container from './components/container'
import './index.scss'

const App = (): React.JSX.Element => {
  // watch for permissions and close the window when granted automatically
  useEffect(() => {
    const check = () => {
      checkPermissions().then((has) => {
        if (has) {
          window.close()
        }
      })
    }

    const t = setInterval(check, 1000)

    check()

    return () => clearInterval(t)
  }, [])

  return (
    <Container>
      <Button
        onClick={async () => {
          if (await askForPermissions()) {
            window.close()
          }
        }}
        title={i18n('grant_permission_button')}
      />
    </Container>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
