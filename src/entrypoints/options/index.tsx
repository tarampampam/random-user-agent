import type React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { send } from '~/shared/messaging'
import { newErrorEvent } from '~/shared/stats'
import { routes } from './routes'
import ErrorBoundary, { NotificationProvider, useNotification } from './shared/hooks'
import './index.scss'

const App = (): React.JSX.Element => {
  const { show } = useNotification()

  return (
    <ErrorBoundary
      onError={async (err) => {
        show({ type: 'error', message: err.message, delay: 30 * 1000 })

        await send({ fireStatsEvents: [newErrorEvent(err, { page: 'settings' })] })
      }}
    >
      <RouterProvider router={createHashRouter(routes)} />
    </ErrorBoundary>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </StrictMode>
)
