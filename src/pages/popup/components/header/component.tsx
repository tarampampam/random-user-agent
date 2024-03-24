import type React from 'react'
import i18n from '~/i18n/i18n'
import ControlIcon from '~/pages/popup/shared/components/control-icon/component'
import styles from './component.module.scss'

export default function Header({
  enabled,
  onPauseResumeClick,
}: {
  enabled: boolean
  onPauseResumeClick?: (newEnabled: boolean) => void
}): React.JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.caption}>{i18n('active_user_agent', 'Active User-Agent')}</div>
      <div className={styles.buttons}>
        <ControlIcon
          icon={enabled ? 'pause' : 'unpause'}
          title={enabled ? i18n('pause_switcher', 'Pause Switcher') : i18n('unpause_switcher', 'Resume Switcher')}
          clickable={true}
          onClick={(): void => {
            if (onPauseResumeClick) {
              onPauseResumeClick(!enabled)
            }
          }}
          style={{ opacity: enabled ? 0.7 : 0.9 }}
        />
      </div>
    </header>
  )
}
