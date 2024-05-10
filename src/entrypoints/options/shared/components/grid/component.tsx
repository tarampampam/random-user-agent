import React from 'react'
import styles from './component.module.scss'

export default class Grid extends React.Component<{ children: React.ReactNode }> {
  static Row = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }): React.JSX.Element => {
    return (
      <div className={styles.row} style={style}>
        {children}
      </div>
    )
  }

  static Column = ({
    children,
    fullWidth,
    style,
  }: {
    children: React.ReactNode
    fullWidth?: boolean
    style?: {
      inner?: React.CSSProperties
      outer?: React.CSSProperties
    }
  }): React.JSX.Element => {
    return (
      <div className={styles.column} style={{ ...{ width: fullWidth ? '100%' : undefined }, ...style?.outer }}>
        <div style={{ ...{ width: fullWidth ? '100%' : undefined }, ...style?.inner }}>{children}</div>
      </div>
    )
  }

  static Hint = ({
    children,
    style,
  }: {
    children: React.ReactNode
    style?: React.CSSProperties
  }): React.JSX.Element => {
    return (
      <div className={styles.hint} style={style}>
        {children}
      </div>
    )
  }

  render() {
    return <div className={styles.grid}>{this.props.children}</div>
  }
}
