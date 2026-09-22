import ModalHeader from './ModalHeader.jsx'

function Modal({ isOpen, title, titleId, onClose, children, variant = 'dialog' }) {
  if (!isOpen) return null

  const isBottomSheet = variant === 'bottomSheet'

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
          max-h-[90vh] 
          w-full 
          overflow-y-auto 
          bg-white shadow-lg 
          ${isBottomSheet ? 'max-w-4xl rounded-t-2xl px-5 pb-6 pt-3' : 'max-w-md rounded-2xl p-6'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {isBottomSheet && <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" />}

        <ModalHeader title={title} titleId={titleId} onClose={onClose} />
        <div className="mt-4">{children}</div>
      </section>
    </div>
  )
}

export default Modal
