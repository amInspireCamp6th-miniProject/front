import ModalHeader from './ModalHeader.jsx'

function Modal({
  isOpen,
  title,
  titleId,
  onClose,
  children,
  variant = 'dialog',
  scrollMode = 'panel',
}) {
  if (!isOpen) return null

  const isBottomSheet = variant === 'bottomSheet'
  const isCustomScroll = scrollMode === 'custom'

  return (
    <div
      className={`
        fixed inset-0 
        z-50 
        flex 
        justify-center 
        ${isBottomSheet ? 'items-end' : 'items-center p-4'}`}
    >
      <button
        type="button"
        className="
          absolute inset-0 
          h-full 
          w-full 
          bg-black/50"
        aria-label="모달 닫기"
        onClick={onClose}
      />

      <section
        className={`
          relative
          max-h-[90dvh]
          w-full
          bg-white shadow-lg
          ${isCustomScroll ? 'flex flex-col overflow-hidden' : 'overflow-y-auto'}
          ${isBottomSheet ? 'max-w-4xl rounded-t-2xl px-5 pb-6 pt-3' : 'max-w-md rounded-2xl p-6'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {isBottomSheet && (
          <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-gray-300" />
        )}

        <div className="shrink-0">
          <ModalHeader title={title} titleId={titleId} onClose={onClose} />
        </div>

        <div className={isCustomScroll ? 'mt-4 flex min-h-0 flex-1 flex-col' : 'mt-4'}>
          {children}
        </div>
      </section>
    </div>
  )
}

export default Modal
