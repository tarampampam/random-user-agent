import type React from 'react'
import ChromeIcon from './assets/chrome.svg'
import EdgeIcon from './assets/edge.svg'
import FirefoxIcon from './assets/firefox.svg'
import OperaIcon from './assets/opera.svg'
import SafariIcon from './assets/safari.svg'

export type BrowserIconProps = {
  icon: 'chrome' | 'edge' | 'firefox' | 'opera' | 'safari'
  size?: string | number
  style?: React.CSSProperties
  clickable?: boolean
  onClick?: () => void
}

export default function BrowserIcon({
  icon,
  size = 32,
  style,
  clickable = false,
  onClick,
}: BrowserIconProps): React.JSX.Element {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: clickable ? 'pointer' : 'default',
      }}
    >
      <img
        src={((): string => {
          switch (icon) {
            case 'chrome':
              return ChromeIcon
            case 'edge':
              return EdgeIcon
            case 'firefox':
              return FirefoxIcon
            case 'opera':
              return OperaIcon
            case 'safari':
              return SafariIcon
          }
        })()}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'inherit',
          ...style,
        }}
        onClick={(): void => {
          if (clickable && onClick) {
            onClick()
          }
        }}
        alt={icon + ' icon'}
      />
    </div>
  )
}
