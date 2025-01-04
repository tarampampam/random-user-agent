import type React from 'react'
import { useId } from 'react'
import styles from './component.module.css'

export default class Input {
  static Number = ({
    id,
    value = 0,
    size,
    min,
    max,
    step,
    placeholder,
    disabled = false,
    style,
    onChange,
  }: {
    id?: string
    value?: number
    size?: number
    min?: number
    max?: number
    step?: number
    placeholder?: string
    disabled?: boolean
    style?: React.CSSProperties
    onChange?: (newValue: number) => void
  }): React.JSX.Element => {
    return (
      <input
        type="number"
        autoComplete="off"
        className={styles.number}
        disabled={disabled}
        id={id ?? useId()}
        value={value}
        min={min}
        max={max}
        size={size}
        step={step}
        placeholder={placeholder}
        style={style}
        onInput={(e) => {
          let newValue = e.currentTarget.valueAsNumber

          if (min && newValue < min) {
            newValue = min
          } else if (max && newValue > max) {
            newValue = max
          } else if (isNaN(newValue)) {
            newValue = min ?? 0
          }

          onChange?.(newValue)
        }}
      />
    )
  }

  static Text = ({
    id,
    value = '',
    size,
    maxLength,
    placeholder,
    disabled = false,
    style,
    onChange,
  }: {
    id?: string
    value?: string
    size?: number
    maxLength?: number
    placeholder?: string
    disabled?: boolean
    style?: React.CSSProperties
    onChange?: (newValue: string) => void
  }) => {
    return (
      <input
        type="text"
        autoComplete="off"
        className={styles.text}
        size={size}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        id={id ?? useId()}
        value={value}
        style={style}
        onInput={(e) => {
          let newValue = e.currentTarget.value

          if (maxLength && newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength)
          }

          onChange?.(newValue)
        }}
      />
    )
  }

  static Textarea = ({
    id,
    value,
    placeholder,
    maxLength,
    cols,
    rows,
    disabled = false,
    style,
    onChange,
  }: {
    id?: string
    value?: string
    placeholder?: string
    maxLength?: number
    cols?: number
    rows?: number
    disabled?: boolean
    style?: React.CSSProperties
    onChange?: (newValue: string) => void
  }): React.JSX.Element => {
    return (
      <textarea
        autoComplete="off"
        className={styles.textarea}
        disabled={disabled}
        id={id ?? useId()}
        value={value}
        maxLength={maxLength}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        style={style}
        onInput={(e) => {
          let newValue = e.currentTarget.value

          if (maxLength && newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength)
          }

          onChange?.(newValue)
        }}
      />
    )
  }
}
