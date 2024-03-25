import type React from 'react'
import i18n from '~/i18n/i18n'
import styles from './component.module.scss'

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
          <a href="#" onClick={onDonateClick}>
            {i18n('make_donation', 'Donate')}
          </a>{' '}
          |{' '}
        </>
      )}
      {onBugReportClick && (
        <>
          <a href="#" onClick={onBugReportClick}>
            {i18n('bug_report', 'Bug report')}
          </a>
        </>
      )}
    </footer>
  ) : (
    <></>
  )
}
