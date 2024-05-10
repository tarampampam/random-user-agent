import { matchRoutes, Navigate, type RouteObject, useLocation } from 'react-router-dom'
import Blacklist from '../pages/blacklist'
import General from '../pages/general'
import Generator from '../pages/generator'
import Layout from '../pages/layout'

export enum RouteIDs {
  GENERAL = 'general',
  GENERATOR = 'generator',
  BLACKLIST = 'blacklist',
}

export const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={RouteIDs.GENERAL} /> },
      { path: 'general', id: RouteIDs.GENERAL, element: <General /> },
      { path: 'generator', id: RouteIDs.GENERATOR, element: <Generator /> },
      { path: 'blacklist', id: RouteIDs.BLACKLIST, element: <Blacklist /> },
      { path: '*', element: <Navigate to={RouteIDs.GENERAL} /> },
    ],
  },
]

/** Resolves the current route ID from the router. */
export function useCurrentRouteID(): RouteIDs | undefined {
  const match = matchRoutes(routes, useLocation())

  if (match) {
    const ids = Object.values<string>(RouteIDs)

    for (const route of match.reverse()) {
      if (route.route.id && ids.includes(route.route.id)) {
        return route.route.id as RouteIDs
      }
    }
  }

  return undefined
}

/**
 * Converts a route ID to a path to use in a link.
 *
 * @example
 * ```tsx
 * <Link to={pathTo(RouteIDs.GENERAL)}>Open general</Link>
 * ```
 */
export function pathTo(path: `${RouteIDs}`): string {
  switch (path) {
    case RouteIDs.GENERAL:
      return '/general'
    case RouteIDs.GENERATOR:
      return '/generator'
    case RouteIDs.BLACKLIST:
      return '/blacklist'
    default:
      return '/'
  }
}
