import React, { useState, type ReactNode } from 'react'
import DeviceIcon, { type DeviceIconProps } from '~/pages/popup/shared/components/device-icon/component'
import BrowserIcon, { type BrowserIconProps } from '~/pages/popup/shared/components/browser-icon/component'
import styles from './component.module.scss'

type DeviceType = 'mobile' | 'desktop'
type BrowserType = 'chrome' | 'edge' | 'firefox' | 'opera' | 'safari'

export type QuickSelectProps = {
  defaults?: { mobile?: BrowserType[]; desktop?: BrowserType[] }
  onChange?: ({ mobile, desktop }: { mobile: BrowserType[]; desktop: BrowserType[] }) => void
}

export default function QuickSelect({
  defaults = { mobile: [], desktop: [] },
  onChange = undefined,
}: QuickSelectProps): React.JSX.Element {
  const [selected, setSelected] = useState<Record<DeviceType, BrowserType[]>>({
    mobile: defaults?.mobile || [],
    desktop: defaults?.desktop || [],
  })

  const handleDeviceTypeClick = (dev: DeviceType): void => {
    const newSelected = { ...selected }

    if (dev === 'mobile') {
      newSelected.mobile = selected.mobile.length !== 0 ? [] : ['chrome', 'edge', 'firefox']
    } else if (dev === 'desktop') {
      newSelected.desktop = selected.desktop.length !== 0 ? [] : ['chrome', 'edge', 'firefox', 'opera', 'safari']
    }

    setSelected(newSelected)

    if (onChange) {
      onChange(newSelected)
    }
  }

  const handleBrowserTypeClick = (dev: DeviceType, br: BrowserType): void => {
    const newSelected = { ...selected }

    if (dev === 'mobile') {
      newSelected.mobile = selected.mobile.includes(br)
        ? selected.mobile.filter((b) => b !== br)
        : [...selected.mobile, br]
    } else if (dev === 'desktop') {
      newSelected.desktop = selected.desktop.includes(br)
        ? selected.desktop.filter((b) => b !== br)
        : [...selected.desktop, br]
    }

    setSelected(newSelected)

    if (onChange) {
      onChange(newSelected)
    }
  }

  const listItemClasses = (dev: DeviceType, br: BrowserType): string => {
    let classes = styles.item

    if ((dev === 'mobile' && selected.mobile.includes(br)) || (dev === 'desktop' && selected.desktop.includes(br))) {
      classes += ` ${styles.active}`
    }

    return classes
  }

  const browserIconProps: Omit<BrowserIconProps, 'icon'> = { size: 24, clickable: true }
  const deviceIconProps: Omit<DeviceIconProps, 'icon'> = { size: 32, clickable: true }

  return (
    <div className={styles.quickSelect}>
      <div className={styles.deviceBased}>
        <div className={styles.device} onClick={() => handleDeviceTypeClick('mobile')}>
          <DeviceIcon icon="mobile" {...deviceIconProps} />
        </div>
        <ul className={styles.typesList}>
          {((items: { browser: BrowserType; title: string; icon: BrowserIconProps['icon'] }[]): ReactNode => {
            return items.map(({ browser, title }) => {
              return (
                <li
                  className={listItemClasses('mobile', browser)}
                  onClick={() => handleBrowserTypeClick('mobile', browser)}
                  title={title}
                  key={browser}
                >
                  <BrowserIcon icon={browser} {...browserIconProps} />
                </li>
              )
            })
          })([
            { browser: 'chrome', title: 'Chrome', icon: 'chrome' },
            { browser: 'edge', title: 'Edge', icon: 'edge' },
            { browser: 'firefox', title: 'FireFox', icon: 'firefox' },
          ])}
        </ul>
      </div>

      <div className={styles.deviceBased}>
        <div className={styles.device} onClick={() => handleDeviceTypeClick('desktop')}>
          <DeviceIcon icon="desktop" {...deviceIconProps} />
        </div>
        <ul className={styles.typesList}>
          {((items: { browser: BrowserType; title: string; icon: BrowserIconProps['icon'] }[]): ReactNode => {
            return items.map(({ browser, title }) => {
              return (
                <li
                  className={listItemClasses('desktop', browser)}
                  onClick={() => handleBrowserTypeClick('desktop', browser)}
                  title={title}
                  key={browser}
                >
                  <BrowserIcon icon={browser} {...browserIconProps} />
                </li>
              )
            })
          })([
            { browser: 'chrome', title: 'Chrome', icon: 'chrome' },
            { browser: 'edge', title: 'Edge', icon: 'edge' },
            { browser: 'firefox', title: 'FireFox', icon: 'firefox' },
            { browser: 'opera', title: 'Opera', icon: 'opera' },
            { browser: 'safari', title: 'Safari', icon: 'safari' },
          ])}
        </ul>
      </div>
    </div>
  )
}
