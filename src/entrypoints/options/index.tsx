import type React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import ErrorBoundary, { NotificationProvider, useNotification } from './shared/hooks'
import './index.scss'

const App = (): React.JSX.Element => {
  const { show } = useNotification()

  return (
    <ErrorBoundary
      onError={async (err) => {
        show({ type: 'error', message: err.message, delay: 30 * 1000 })
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
