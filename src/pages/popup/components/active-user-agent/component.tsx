import type React from 'react'
import styles from './component.module.scss'

export default function ActiveUserAgent({ userAgent }: { userAgent?: string }): React.JSX.Element {
  return <div className={styles.active}>{userAgent ?? '(╯°□°)╯︵ ┻━┻'}</div>
}
