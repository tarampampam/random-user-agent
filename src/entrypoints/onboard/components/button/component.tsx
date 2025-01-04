import type React from 'react'
import styles from './component.module.css'

export default function Button({ title, onClick }: { title: string; onClick: () => void }): React.JSX.Element {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  )
}
