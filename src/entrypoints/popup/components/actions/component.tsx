import type React from 'react'
import { i18n } from '~/i18n'
import Icon, { type IconProps } from '~/shared/components/icon'
import { PauseIcon, RefreshIcon, SettingsIcon, UnpauseIcon } from '~/shared/assets/icons'
import styles from './component.module.scss'

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
  const iconProps: Omit<IconProps, 'src'> = { size: '1.89em', clickable: true }

  return (
    <>
      <div
        className={styles.action + (isExtensionEnabled ? '' : ` ${styles.blinkingBackground}`)}
        onClick={(): void => onPauseResumeClick?.(!isExtensionEnabled)}
      >
        <div className={styles.icon}>
          <Icon src={isExtensionEnabled ? PauseIcon : UnpauseIcon} {...iconProps} />
        </div>
        <span>
          {i18n(
            isExtensionEnabled ? 'pause_switcher' : 'unpause_switcher',
            isExtensionEnabled ? 'Pause Switcher' : 'Resume Switcher'
          )}
        </span>
      </div>
      <div className={styles.action} onClick={onRefreshClick}>
        <div className={styles.icon}>
          <Icon src={RefreshIcon} {...iconProps} />
        </div>
        <span>{i18n('get_new_agent')}</span>
      </div>
      <div className={styles.action} onClick={onOpenOptionsClick}>
        <div className={styles.icon}>
          <Icon src={SettingsIcon} {...iconProps} />
        </div>
        <span>{i18n('open_settings')}</span>
      </div>
    </>
  )
}
