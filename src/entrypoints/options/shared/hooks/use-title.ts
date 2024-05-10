import { useEffect } from 'react'

/** Sets the title of the current page and restores the previous title on unmount. */
export default function (title: string): void {
  useEffect((): undefined | (() => void) => {
    const originalTitle: Readonly<string> = document.title

    document.title = title

    return (): void => {
      document.title = originalTitle // restore the default title
    }
  }, [title])
}
