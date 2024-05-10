import type React from 'react'
import i18n from '~/i18n/i18n'
import logo from '~/shared/assets/logo.svg'
import styles from './component.module.scss'

export default function Container({ children = null }: { children?: React.ReactNode }): React.JSX.Element {
  return (
    <div className={styles.container}>
      <main className={styles.wrapper}>
        <div className={styles.left}>
          <img alt="logo" src={logo} className={styles.logo} />
        </div>
        <div className={styles.right}>
          <h2 className={styles.center}>{i18n('manifest_name')}</h2>

          <p className={styles.center}>{i18n('why_we_need_permissions')}:</p>

          <ul>
            <li>
              {i18n('read_and_modify_data') + ' '}({i18n('read_and_modify_data_reason')})
            </li>
          </ul>

          <div className={styles.embeddedContent}>{children}</div>
        </div>
      </main>
    </div>
  )
}
