import Button from './Button.jsx'

function ModalHeader({ title, titleId, onClose }) {
  return (
    <div
      className="
      flex 
      items-center 
      justify-between"
    >
      <h2 id={titleId} className="text-lg font-bold">
        {title}
      </h2>

      <Button
        className="
          h-8 
          w-8 
          rounded-full 
          text-gray-500 
          hover:bg-gray-100"
        onClick={onClose}
        aria-label="닫기"
      >
        ✕
      </Button>
    </div>
  )
}

export default ModalHeader
