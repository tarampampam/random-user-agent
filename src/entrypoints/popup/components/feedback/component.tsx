import type React from 'react'
import { i18n } from '~/i18n'
import styles from './component.module.css'

export default function Feedback({ onRateLinkClick }: { onRateLinkClick?: () => void }): React.JSX.Element {
  return (
    <>
      <a className={styles.rateLink} href="#" onClick={onRateLinkClick}>
        {i18n('please_rate_extension')}
      </a>
    </>
  )
}
