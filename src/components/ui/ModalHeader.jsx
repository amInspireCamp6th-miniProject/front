import IconButton from './IconButton.jsx'

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

      <IconButton icon="x" aria-label="닫기" onClick={onClose} />
    </div>
  )
}

export default ModalHeader
