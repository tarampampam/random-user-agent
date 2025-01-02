import type React from 'react'
import { useRef, useState } from 'react'
import { createContext, useContext } from 'react'
import styles from './provider.module.scss'

type NotificationType = 'info' | 'error'

type Context = {
  show: (props: { message: React.ReactNode; type?: NotificationType; delay?: number }) => void
}

const context = createContext<Context>({
  show: () => {
    throw new Error('Notification context provider is not found')
  },
})

export function NotificationProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const timer = useRef<NodeJS.Timeout>(undefined)

  const [message, setMessage] = useState<React.ReactNode>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [type, setType] = useState<NotificationType>('info')

  const hide = () => {
    setIsVisible(false)
    timer.current = undefined
  }

  const show = ({
    message,
    type = 'info',
    delay = 5000,
  }: {
    message: React.ReactNode
    type?: NotificationType
    delay?: number
  }) => {
    setMessage(message)
    setType(type)
    setIsVisible(true)

    if (timer) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(hide, Math.max(0, delay))
  }

  return (
    <context.Provider value={{ show }}>
      <div
        className={[styles.notification, isVisible ? styles.visible : styles.hidden, styles[type]].join(' ')}
        onMouseDown={(e) => e.button === 1 && hide()} // middle click
      >
        <div className={styles.closeBtn} onClick={hide} />
        {message}
      </div>
      {children}
    </context.Provider>
  )
}

export function useNotification(): Context {
  const ctx = useContext(context)

  if (!ctx) {
    throw new Error('useNotification should be used inside NotificationProvider')
  }

  return ctx
}
