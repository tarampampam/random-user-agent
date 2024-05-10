import React from 'react'
import styles from './component.module.scss'

export default class Button extends React.Component<{ children: React.ReactNode }> {
  static Primary = ({
    text,
    onClick,
    disabled = false,
    pulse = false,
    style,
    children,
  }: {
    text: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    pulse?: boolean
    style?: React.CSSProperties
    children?: React.ReactNode
  }): React.JSX.Element => {
    return (
      <button
        className={styles.primary + (pulse && !disabled ? ' ' + styles.pulse : '')}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        {text ?? children}
      </button>
    )
  }

  render() {
    return <button>{this.props.children}</button>
  }
}
