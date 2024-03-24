import React, { useId } from 'react'
import Checkbox from '../../shared/components/checkbox/component.tsx'
import i18n from '~/i18n/i18n'
import styles from './component.module.scss'

export default function EnabledOnDomain({ onChange }: { onChange?: (newValue: boolean) => void }): React.JSX.Element {
  const checkboxId = useId()

  return (
    <div className={styles.component}>
      <span>
        <label htmlFor={checkboxId}>{i18n('enabled_on_this_domain', 'Enabled on this domain')}</label>
      </span>
      <Checkbox id={checkboxId} onChange={onChange} />
    </div>
  )
}
