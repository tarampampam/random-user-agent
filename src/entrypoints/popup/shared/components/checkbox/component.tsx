import type React from 'react'
import styles from './component.module.scss'

export default function Checkbox({
  id,
  title,
  checked,
  onChange,
}: {
  id?: string
  title?: string
  checked?: boolean
  onChange?: (newValue: boolean) => void
}): React.JSX.Element {
  return (
    <>
      <input
        className={styles.toggle}
        id={id}
        title={title}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        type="checkbox"
      />
      <label className={styles.toggleBtn} htmlFor={id} title={title} />
    </>
  )
}
