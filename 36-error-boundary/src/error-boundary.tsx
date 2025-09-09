import { Component, ErrorInfo, type ReactNode } from 'react'

interface FallbackRenderArgs {
  error: Error
  errorInfo: ErrorInfo
}

interface Props {
  FallbackComponent?: ReactNode
  fallbackRender?: ({ error, errorInfo }: FallbackRenderArgs) => ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
  error: null | Error
  errorInfo: null | ErrorInfo
}

// 컴포넌트
// - 속성(props)
// - 상태(state)
// - 생명주기(lifecycles) : 오류 감지를 위한 생명주기
export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  static getDerivedStateFromError(error: Error) {
    // 파생된 상태
    return error
      ? {
          hasError: true,
          error,
        }
      : null
  }

  render() {
    const { FallbackComponent, children } = this.props
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      return (
        FallbackComponent ?? (
          <div role="alert" className="bg-red-800 text-white p-10">
            <h2>오류 발생! {error?.message}</h2>
            <p>컴포넌트 스택: {errorInfo?.componentStack}</p>
            <p>컴포넌트 다이제스트: {errorInfo?.digest}</p>
          </div>
        )
      )
    }

    return children
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }
}
