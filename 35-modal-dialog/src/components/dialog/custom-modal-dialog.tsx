// Modal Dialog 컴포넌트
// 1. Custom Modal Dialog: <div role="dialog" aria-modal="true">
// 2. Native Modal Dialog: <dialog aria-modal="true">
import {
  type MouseEvent,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { XCircleIcon } from 'lucide-react'
import { tabbableSelector, tw } from '@/utils'

type Props = PropsWithChildren<{
  open?: boolean
  onClose?: () => void
  title?: string
  describe?: string
}>

export default function CustomModalDialog({
  open = false,
  onClose,
  title,
  describe,
  children,
}: Props) {
  const dialogDimRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const opennerRef = useRef<HTMLElement>(null)

  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const describeId = `${dialogId}-describe`

  const close = useCallback(() => {
    opennerRef.current?.focus()
    onClose?.()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    // 모달 다이얼로그를 연 어떤 요소를 RefObject를 사용해 기억(memo)
    opennerRef.current = document.activeElement as HTMLElement

    // 모달이 열리면 모달 안에서 탭키로 탐색 가능한(tabbale) 요소들을 수집
    const tabbables = [...dialog.querySelectorAll(tabbableSelector)]
    const isExistTabbables = tabbables.length > 0

    // 첫 번째 탭 키로 이동 가능한 요소에 초점 이동 설정
    const focusingFirstTabbable = () => {
      // 탭 가능한 요소가 있으면 실행
      if (isExistTabbables) {
        // 첫 번째 탭 가능한 요소
        const firtsTabbable = tabbables.at(0)
        if (firtsTabbable) {
          ;(firtsTabbable as HTMLElement).focus()
        }
      }
    }

    focusingFirstTabbable()

    // 포커스 트랩(focus-trap)
    // - 탭 가능한 요소들 중 첫 번째 요소에서 shift + 탭 키를 누르면
    // 마지막 요소로 초점 이동(브라우저의 기본 작동 방지)
    // - 탭 가능한 요소들 중 마지막 요소에서 탭 키를 누르면
    // 첫 번째 요소로 초점 이동(브라우저의 기본 작동 방지)
    // - 탈출(escape) 키를 누르면 모달 다이얼로그가 닫혀야 하고,
    // 모달 다이얼로그를 트리거한 오프너(openner) 요소에 초점을 돌려줘야 함
    const handleFocusTrap = (e: globalThis.KeyboardEvent) => {
      // 포커스 가능한 요소가 없으면 종료
      if (!isExistTabbables) return

      const { key, shiftKey } = e
      const { activeElement } = document
      //tabbables.length > 0로 인해 무조건 요소가 있는 것으로간주
      const firtsTabbable = tabbables.at(0) as HTMLElement
      const lastTabbable = tabbables.at(-1) as HTMLElement

      // if (key === 'Escape') {
      //   onClose?.()
      //   opnnerRef.current?.focus()
      //   return
      // }
      if (key === 'Escape') return close()

      if (key === 'Tab') {
        if (shiftKey && activeElement === firtsTabbable) {
          // - 탭 가능한 요소들 중 첫 번째 요소에서 shift + 탭 키를 누르면
          // 마지막 요소로 초점 이동(브라우저의 기본 작동 방지)
          e.preventDefault()
          lastTabbable.focus()
        } else if (!shiftKey && activeElement === lastTabbable) {
          // - 탭 가능한 요소들 중 마지막 요소에서 탭 키를 누르면
          // 첫 번째 요소로 초점 이동(브라우저의 기본 작동 방지)
          e.preventDefault()
          firtsTabbable.focus()
        }
      }
    }

    dialog.addEventListener('keydown', handleFocusTrap)

    // 다이얼로그 열린 상태
    // 문서의 스크롤 바를 감춤
    document.body.style.overflowY = 'hidden'

    return () => {
      dialog.removeEventListener('keydown', handleFocusTrap)
      // 다이얼로그 닫힌 상태
      // 문서의 스크롤 바를 표시
      setTimeout(() => {
        document.body.style.overflowY = 'visible'
        // 모달이 닫히고 스크롤바가 생기는 시간을 조절 가능
      }, 0)
    }
  }, [open, onClose, close])

  const portalContainer = document.getElementById('modal-dialog-portal')
  if (!portalContainer) return null

  // const handleClose = (e: MouseEvent<HTMLDivElement>) => {
  //   if (dialogDimRef.current === e.target) {
  //     onClose?.()
  //   }
  // }

  return createPortal(
    <div
      ref={dialogDimRef}
      role="presentation"
      onClick={(e) => dialogDimRef.current === e.target && close()}
      className={tw(
        'fixed inset-0 z-10000',
        open ? 'flex' : 'hidden',
        'justify-center items-center',
        'bg-black/20 backdrop-blur-[3px]'
      )}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={describe ? describeId : undefined}
        className={tw(
          'relative w-full max-w-lg rounded-lg shadow-xl p-10',
          'bg-white'
        )}
      >
        <h2 id={titleId}>{title && '다이얼로그 제목'}</h2>
        {describe && <p id={describeId}>{describe}</p>}
        {children}
        <button
          type="button"
          aria-label="다이얼로그 닫기"
          title="다이얼로그 닫기"
          onClick={close}
          className={tw(
            'cursor-pointer',
            'absolute -top-2.5 -right-2.5 bg-black text-white rounded-full'
          )}
        >
          <XCircleIcon size={28} />
        </button>
      </div>
    </div>,
    portalContainer
  )
}
