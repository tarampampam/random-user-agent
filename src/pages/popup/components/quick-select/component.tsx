import React, { useState, useEffect, type ReactNode } from 'react'
import styles from './component.module.scss'
import DeviceIcon, { type DeviceIconProps } from '~/pages/popup/shared/components/device-icon/component'
import BrowserIcon, { type BrowserIconProps } from '~/pages/popup/shared/components/browser-icon/component'

type DeviceType = 'mobile' | 'desktop'
type BrowserType = 'chrome' | 'edge' | 'firefox' | 'opera' | 'safari'

export type QuickSelectChangeHandler = ({ mobile, desktop }: { mobile: BrowserType[]; desktop: BrowserType[] }) => void

export type QuickSelectProps = {
  defaultSelectedMobileBrowsers?: BrowserType[]
  defaultSelectedDesktopBrowsers?: BrowserType[]
  onChange?: QuickSelectChangeHandler
}

export default function QuickSelect({
  defaultSelectedMobileBrowsers = [],
  defaultSelectedDesktopBrowsers = [],
  onChange = undefined,
}: QuickSelectProps): React.JSX.Element {
  const [selectedMobile, setSelectedMobile] = useState<BrowserType[]>(defaultSelectedMobileBrowsers)
  const [selectedDesktop, setSelectedDesktop] = useState<BrowserType[]>(defaultSelectedDesktopBrowsers)

  useEffect(() => {
    if (onChange) {
      onChange({ mobile: selectedMobile, desktop: selectedDesktop })
    }
  }, [selectedMobile, selectedDesktop, onChange])

  const handleDeviceTypeClick = (dev: DeviceType): void => {
    if (dev === 'mobile') {
      setSelectedMobile(selectedMobile.length !== 0 ? [] : ['chrome', 'firefox', 'safari'])
    } else if (dev === 'desktop') {
      setSelectedDesktop(selectedDesktop.length !== 0 ? [] : ['chrome', 'edge', 'firefox', 'opera', 'safari'])
    }
  }

  const handleBrowserTypeClick = (dev: DeviceType, br: BrowserType): void => {
    if (dev === 'mobile') {
      setSelectedMobile(selectedMobile.includes(br) ? selectedMobile.filter((b) => b !== br) : [...selectedMobile, br])
    } else if (dev === 'desktop') {
      setSelectedDesktop(
        selectedDesktop.includes(br) ? selectedDesktop.filter((b) => b !== br) : [...selectedDesktop, br]
      )
    }
  }

  const listItemClasses = (dev: DeviceType, br: BrowserType): string => {
    let classes = styles.item

    if ((dev === 'mobile' && selectedMobile.includes(br)) || (dev === 'desktop' && selectedDesktop.includes(br))) {
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
