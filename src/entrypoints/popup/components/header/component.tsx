import type React from 'react'
import { i18n } from '~/i18n'
import Icon from '~/shared/components/icon'
import { PauseIcon, UnpauseIcon } from '~/shared/assets/icons'
import styles from './component.module.css'

export default function Header({
  isExtensionEnabled,
  onPauseResumeClick,
}: {
  isExtensionEnabled: boolean
  onPauseResumeClick?: (newEnabled: boolean) => void
}): React.JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.caption}>{i18n('active_user_agent')}</div>
      <div className={styles.buttons}>
        <Icon
          src={isExtensionEnabled ? PauseIcon : UnpauseIcon}
          size="1.89em"
          title={isExtensionEnabled ? i18n('pause_switcher') : i18n('unpause_switcher')}
          onClick={(): void => onPauseResumeClick?.(!isExtensionEnabled)}
          style={{ img: { opacity: isExtensionEnabled ? 0.7 : 0.9 } }}
          clickable
        />
      </div>
    </header>
  )
}
