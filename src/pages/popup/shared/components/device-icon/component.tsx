import type React from 'react'
import MobileIcon from './assets/mobile.svg'
import DesktopIcon from './assets/desktop.svg'

export type DeviceIconProps = {
  icon: 'mobile' | 'desktop'
  size?: string | number
  style?: React.CSSProperties
  clickable?: boolean
  onClick?: () => void
}

export default function DeviceIcon({
  icon,
  size = 32,
  style,
  clickable = false,
  onClick,
}: DeviceIconProps): React.JSX.Element {
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
            case 'mobile':
              return MobileIcon
            case 'desktop':
              return DesktopIcon
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
