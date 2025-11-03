import React, { useCallback, useId, useMemo } from 'react'
import { type ReactNode, useState } from 'react'
import { i18n } from '~/i18n'
import Icon, { type IconProps } from '~/shared/components/icon'
import {
  AndroidIcon,
  ChromeIcon,
  EdgeIcon,
  FirefoxIcon,
  IosIcon,
  LinuxIcon,
  MacosIcon,
  OperaIcon,
  SafariIcon,
  WindowsIcon,
} from '~/shared/assets/icons'
import { type BrowserType, generatorTypesToSets, type OSType, setsToGeneratorTypes } from '~/shared'
import Checkbox from '../../shared/components/checkbox'
import styles from './component.module.css'

export type QuickSelectProps = {
  defaults?: { browsers: Array<BrowserType>; os: Array<OSType>; syncOs: boolean }
  onChange?: ({ browsers, os, syncOs }: { browsers: Array<BrowserType>; os: Array<OSType>; syncOs: boolean }) => void
}

export default function QuickSelect({
  defaults = { browsers: [], os: [], syncOs: false },
  onChange = undefined,
}: QuickSelectProps): React.JSX.Element {
  const [browserTypes, setBrowserTypes] = useState<BrowserType[]>(defaults?.browsers || [])
  const [osList, setOsList] = useState<OSType[]>(defaults?.os || [])
  const [syncOs, setSyncOs] = useState<boolean>(defaults?.syncOs || false)

  // derive supported OSes from the selected browsers/OS list
  const supportedOSes = useMemo(() => {
    // compute allowed OSes for the current browser selection
    const [, oses] = generatorTypesToSets(setsToGeneratorTypes(browserTypes.length ? browserTypes : 'any', 'any'))

    // return a shallow copy so callers can safely mutate their own array if needed
    return [...oses]
  }, [browserTypes])

  /** Handle the browser change */
  const handleBrowserChange = useCallback(
    (type: BrowserType) =>
      setBrowserTypes((prev) => {
        // add or remove the selected browser from the current list and filter out the unsupported browsers
        const newTypes = [...new Set(prev.includes(type) ? prev.filter((v) => v !== type) : [...prev, type])].sort()

        // if no one browser selected
        if (!newTypes.length) {
          // but there are selected OSes
          if (osList.length) {
            // we try to detect the allowed browsers for the selected OSes
            const [allowedBrowsers] = generatorTypesToSets(setsToGeneratorTypes('any', osList))

            // and if there are any, we select them
            if (allowedBrowsers.length) {
              newTypes.push(...allowedBrowsers)
            } else {
              // but if there are no allowed browsers for the selected OSes, we default to Chrome
              newTypes.push('chrome')
            }
          } else {
            // there are no selected OSes, so we default to Chrome
            newTypes.push('chrome')
          }
        }

        // get the allowed OSes for the selected browsers
        const [, allowedOSes] = generatorTypesToSets(setsToGeneratorTypes(newTypes, 'any'))
        // filter out the unsupported OSes from the current OSes list
        const filteredOSes = osList.filter((os) => allowedOSes.includes(os))
        // if there are no allowed OSes for the selected browsers, we default to the OSes for the selected browsers
        if (!filteredOSes.length) {
          filteredOSes.push(...allowedOSes)
        }

        // update the OS list
        setOsList(filteredOSes)

        onChange?.({ browsers: newTypes, os: filteredOSes, syncOs })

        return newTypes
      }),
    [setBrowserTypes, onChange, osList, syncOs]
  )

  /** Handle the sync OS change */
  const handleSyncOsChange = useCallback(
    (isChecked: boolean) =>
      setSyncOs(() => {
        onChange?.({ browsers: browserTypes, os: osList, syncOs: isChecked })

        return isChecked
      }),
    [setSyncOs, onChange, browserTypes, osList]
  )

  /** Handle the OS change */
  const handleOsChange = useCallback(
    (os: OSType) =>
      setOsList((prev) => {
        // get the allowed OSes for the selected browsers
        const [, supportedOSes] = generatorTypesToSets(setsToGeneratorTypes(browserTypes, 'any'))

        // add or remove the selected OS from the current list and filter out the unsupported OSes
        const newOs = [...new Set(prev.includes(os) ? prev.filter((v) => v !== os) : [...prev, os])]
          .filter((os) => supportedOSes.includes(os))
          .sort()

        // if no one OS selected, but there are selected browsers
        if (!newOs.length && browserTypes.length) {
          // we try to detect the allowed OSes for the selected browsers
          const [, allowedOses] = generatorTypesToSets(setsToGeneratorTypes(browserTypes, 'any'))

          // and if there are any, we select them
          if (allowedOses.length) {
            newOs.push(...allowedOses)
          }
        }

        onChange?.({ browsers: browserTypes, os: newOs, syncOs })

        return newOs
      }),
    [setOsList, onChange, browserTypes, syncOs]
  )

  const syncOsId = useId()
  const iconProps: Omit<IconProps, 'src'> = { size: 24, clickable: true }

  return (
    <div className={styles.quickSelect}>
      <section className={styles.section}>
        <ul className={styles.options}>
          {((items: { type: BrowserType; title: string; icon: IconProps['src'] }[]): ReactNode => {
            return items.map(({ type, title, icon }) => {
              return (
                <li
                  className={[styles.item, browserTypes.includes(type) ? styles.active : null]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleBrowserChange(type)}
                  title={title}
                  key={type}
                >
                  <Icon src={icon} {...iconProps} />
                </li>
              )
            })
          })([
            { type: 'chrome', title: 'Chrome', icon: ChromeIcon },
            { type: 'firefox', title: 'FireFox', icon: FirefoxIcon },
            { type: 'safari', title: 'Safari', icon: SafariIcon },
            { type: 'edge', title: 'Edge', icon: EdgeIcon },
            { type: 'opera', title: 'Opera', icon: OperaIcon },
          ])}
        </ul>
      </section>

      <section className={styles.switch}>
        <div className={styles.switchLabel}>
          <label htmlFor={syncOsId}>{i18n('sync_useragent_with_host_os')}</label>
        </div>
        <div className={styles.switchAction}>
          <Checkbox id={syncOsId} checked={syncOs} onChange={handleSyncOsChange} />
        </div>
      </section>

      {!syncOs && (
        <section className={styles.section}>
          <ul className={styles.options}>
            {((items: { os: OSType; title: string; icon: IconProps['src'] }[]): ReactNode => {
              return items.map(({ os, title, icon }) => {
                if (supportedOSes.length && !supportedOSes.includes(os)) {
                  return null
                }

                return (
                  <li
                    className={[styles.item, osList.includes(os) ? styles.active : null].filter(Boolean).join(' ')}
                    onClick={() => handleOsChange(os)}
                    title={title}
                    key={os}
                  >
                    <Icon src={icon} {...iconProps} />
                  </li>
                )
              })
            })([
              { os: 'linux', title: 'Linux', icon: LinuxIcon },
              { os: 'windows', title: 'Windows', icon: WindowsIcon },
              { os: 'macos', title: 'macOS', icon: MacosIcon },
              { os: 'ios', title: 'iOS', icon: IosIcon },
              { os: 'android', title: 'Android', icon: AndroidIcon },
            ])}
          </ul>
        </section>
      )}
    </div>
  )
}
