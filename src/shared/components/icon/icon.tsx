import React, { useId } from 'react'

export type IconProps = {
  src: 'foo' | string
  id?: string
  disabled?: boolean
  clickable?: boolean
  alt?: string
  title?: string
  size?: string | number
  style?: Partial<{ outer: React.CSSProperties; img: React.CSSProperties }>
  onClick?: () => void
}

export default function Icon({
  src,
  id = useId(), // eslint-disable-line react-hooks/rules-of-hooks
  disabled = false,
  clickable = false,
  alt = 'icon',
  title,
  size = 32,
  style,
  onClick,
}: IconProps): React.JSX.Element {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: (clickable || onClick) && !disabled ? 'pointer' : 'default',
        ...style?.outer,
      }}
    >
      <img
        id={id}
        src={src}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'inherit',
          filter: disabled ? 'grayscale(1)' : undefined,
          ...style?.img,
        }}
        onClick={(): void => {
          if (!disabled) {
            onClick?.()
          }
        }}
        title={title}
        draggable={false}
        alt={alt}
      />
    </div>
  )
}
