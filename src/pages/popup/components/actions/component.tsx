import type React from 'react'
import styles from './component.module.scss'
import ControlIcon from '~/pages/popup/shared/components/control-icon/component'
import i18n from '~/i18n/i18n'

export default function Actions({
  isExtensionEnabled,
  onPauseResumeClick,
  onRefreshClick,
  onOpenOptionsClick,
}: {
  isExtensionEnabled: boolean
  onPauseResumeClick?: (newEnabled: boolean) => void
  onRefreshClick?: () => void
  onOpenOptionsClick?: () => void
}): React.JSX.Element {
  return (
    <>
      <div
        className={styles.action + (isExtensionEnabled ? '' : ` ${styles.blinkingBackground}`)}
        onClick={(): void => {
          if (onPauseResumeClick) {
            onPauseResumeClick(!isExtensionEnabled)
          }
        }}
      >
        <div className={styles.icon}>
          <ControlIcon icon={isExtensionEnabled ? 'pause' : 'unpause'} clickable={true} />
        </div>
        <span>
          {i18n(
            isExtensionEnabled ? 'pause_switcher' : 'unpause_switcher',
            isExtensionEnabled ? 'Pause Switcher' : 'Resume Switcher'
          )}
        </span>
      </div>
      <div
        className={styles.action}
        onClick={(): void => {
          if (onRefreshClick) {
            onRefreshClick()
          }
        }}
      >
        <div className={styles.icon}>
          <ControlIcon icon={'refresh'} clickable={true} />
        </div>
        <span>{i18n('get_new_agent', 'Get new agent')}</span>
      </div>
      <div
        className={styles.action}
        onClick={(): void => {
          if (onOpenOptionsClick) {
            onOpenOptionsClick()
          }
        }}
      >
        <div className={styles.icon}>
          <ControlIcon icon={'settings'} clickable={true} />
        </div>
        <span>{i18n('open_settings', 'Open settings')}</span>
      </div>
    </>
  )
}
