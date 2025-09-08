import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export default function NativeDialog({ children }: PropsWithChildren) {
  if (typeof document === 'undefined') return null
  const portalRoot = document.getElementById('modal-portal')
  if (!portalRoot) return null // 혹은 fallback 처리
  return createPortal(
    <div className="modal-dim bg-[rgba(0,0,0,0.5)] fixed inset-0 flex flex-col justify-center ">
      <dialog
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        open
        className="p-10 m-auto"
      >
        <h2 id="dialog-title">다이얼로그 제목</h2>
        <p id="dialog-desc">다이얼로그 설명을 작성합니다.</p>
        {children}
        <button type="button" aria-label="다이얼로그 닫기">
          닫기
        </button>
      </dialog>
    </div>,
    portalRoot
  )
}
