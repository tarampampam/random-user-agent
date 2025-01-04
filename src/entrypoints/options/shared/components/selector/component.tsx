import type React from 'react'
import styles from './component.module.css'

export default function Selector<T extends Readonly<Record<string, { title: string }>>>({
  variants,
  value,
  onChange,
}: {
  variants: T
  value?: keyof T
  onChange?: (newValue: keyof T) => void
}): React.JSX.Element {
  return (
    <ul className={styles.list}>
      {Object.entries(variants).map(([key, { title }]) => (
        <li key={key} className={key === value ? styles.selected : ''} onClick={() => onChange?.(key)}>
          {title}
        </li>
      ))}
    </ul>
  )
}
