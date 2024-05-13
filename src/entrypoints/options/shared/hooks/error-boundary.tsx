import React, { type ErrorInfo, useCallback, useEffect } from 'react'

export type ErrorHandler = (error: Error, errorInfo: ErrorInfo) => void

/**
 * The error boundary component, which catches the errors and unhandled promise rejections.
 *
 * If the `onError` is not provided, the default global error handler will be used.
 *
 * ⚠ Must be used inside the `AuthProvider` component.
 */
export default function ErrorBoundary({
  children,
  onError,
}: {
  children: React.ReactNode
  onError: ErrorHandler
}): React.JSX.Element {
  const errorsListener = useCallback(
    (event: ErrorEvent): void => {
      onError(event.error instanceof Error ? event.error : new Error(String(event.error)), event.error.stack)
    },
    [onError]
  )

  const rejectionsListener = useCallback(
    (event: PromiseRejectionEvent): void => {
      onError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)), event.reason.stack)
    },
    [onError]
  )

  useEffect(() => {
    window.addEventListener('error', errorsListener) // catch global errors
    window.addEventListener('unhandledrejection', rejectionsListener) // catch unhandled promise rejections

    return () => {
      window.removeEventListener('error', errorsListener)
      window.removeEventListener('unhandledrejection', rejectionsListener)
    }
  }, [errorsListener, rejectionsListener])

  return <CatchWrapper onError={onError}>{children}</CatchWrapper>
}

type CatchWrapperProps = {
  children: React.ReactNode
  onError: ErrorHandler
}

/**
 * Since the `componentDidCatch` is not available in the functional components, we need to use the class component.
 *
 * @link https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
class CatchWrapper extends React.Component<CatchWrapperProps> {
  private readonly onError: ErrorHandler

  constructor(props: CatchWrapperProps) {
    super(props)

    this.onError = props.onError
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.onError(error, errorInfo) // catch the component errors
  }

  render(): React.ReactNode {
    return this.props.children
  }
}
