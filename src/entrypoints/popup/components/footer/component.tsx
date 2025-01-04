import type React from 'react'
import { i18n } from '~/i18n'
import styles from './component.module.css'

export default function Footer({
  version,
  onDonateClick,
  onBugReportClick,
}: {
  version?: string
  onDonateClick?: () => void
  onBugReportClick?: () => void
}): React.JSX.Element {
  return version || onDonateClick || onBugReportClick ? (
    <footer className={styles.component}>
      {version && <>v{version} | </>}
      {onDonateClick && (
        <>
          <a onClick={onDonateClick} rel="noreferrer">
            {i18n('make_donation')}
          </a>{' '}
          |{' '}
        </>
      )}
      {onBugReportClick && (
        <>
          <a onClick={onBugReportClick} rel="noreferrer">
            {i18n('bug_report')}
          </a>
        </>
      )}
    </footer>
  ) : (
    <></>
  )
}
