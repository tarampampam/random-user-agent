import type React from 'react'
import { useId } from 'react'
import { i18n } from '~/i18n'
import Checkbox from '../../shared/components/checkbox'
import styles from './component.module.css'

export default function EnabledOnDomain({
  isEnabled,
  onChange,
}: {
  isEnabled: boolean
  onChange?: (newValue: boolean) => void
}): React.JSX.Element {
  const checkboxId = useId()

  return (
    <div className={styles.component}>
      <span>
        <label htmlFor={checkboxId}>{i18n('enabled_on_this_domain')}</label>
      </span>
      <Checkbox id={checkboxId} checked={isEnabled} onChange={onChange} />
    </div>
  )
}
