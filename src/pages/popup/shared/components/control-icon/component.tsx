import type React from 'react'
import PauseIcon from './assets/pause-icon.svg'
import UnpauseIcon from './assets/unpause-icon.svg'
import RefreshIcon from './assets/refresh-icon.svg'
import SettingsIcon from './assets/settings-icon.svg'

export default function ControlIcon({
  icon,
  width = '1.89em',
  height = '1.89em',
  title,
  style,
  clickable = false,
  onClick,
}: {
  icon: 'pause' | 'unpause' | 'refresh' | 'settings'
  width?: string | number
  height?: string | number
  title?: string
  style?: React.CSSProperties
  clickable?: boolean
  onClick?: () => void
}): React.JSX.Element {
  return (
    <div style={{ width, height }}>
      <img
        src={((): string => {
          switch (icon) {
            case 'pause':
              return PauseIcon
            case 'unpause':
              return UnpauseIcon
            case 'refresh':
              return RefreshIcon
            case 'settings':
              return SettingsIcon
          }
        })()}
        style={{
          ...style,
          width: '100%',
          height: '100%',
          cursor: clickable ? 'pointer' : 'default',
        }}
        title={title}
        onClick={(): void => {
          if (clickable && onClick) {
            onClick()
          }
        }}
        alt="icon"
      />
    </div>
  )
}
