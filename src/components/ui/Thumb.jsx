import defaultImage from '../../assets/images/ingredient-default.svg'

function Thumb({ src, alt = '' }) {
  return (
    <img
      src={src || defaultImage}
      alt={alt}
      className="size-12 shrink-0 rounded-full object-cover"
    />
  )
}

export default Thumb
