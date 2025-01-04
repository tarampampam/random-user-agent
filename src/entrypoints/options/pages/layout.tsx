import type React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { i18n } from '~/i18n'
import { pathTo, RouteIDs, useCurrentRouteID } from '../routes'
import styles from './layout.module.css'

export default function Layout(): React.JSX.Element {
  const currentRouteID = useCurrentRouteID()

  return (
    <main className={styles.main}>
      <header className={styles.header} />
      <section className={styles.container}>
        <nav className={styles.navigation}>
          <ul>
            {[
              { routeID: RouteIDs.GENERAL, title: i18n('general_settings') },
              { routeID: RouteIDs.GENERATOR, title: i18n('generator_settings') },
              { routeID: RouteIDs.BLACKLIST, title: i18n('blacklist_settings') },
            ].map(({ routeID, title }) => (
              <li key={routeID} className={routeID === currentRouteID ? styles.selectedPage : undefined}>
                <Link to={pathTo(routeID)}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <aside className={styles.content}>
          <Outlet />
        </aside>
      </section>
      <footer className={styles.footer}>
        <div>
          <span>
            {i18n('like_this_extension')}

            <span style={{ padding: '0 .4em' }}>⭐</span>
            <a href={__GITHUB_URL__} target="_blank" rel="noreferrer">
              {i18n('give_a_star_on_github')}
            </a>
          </span>
        </div>
      </footer>
    </main>
  )
}
