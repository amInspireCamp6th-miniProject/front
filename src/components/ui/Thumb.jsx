import defaultImage from '../../assets/images/ingredient-default.svg'

// md: 목록·카드 썸네일(원형 48px). lg: 폼 미리보기(모서리 둥근 사각형 160px)
const SIZE_CLASS = {
  md: 'size-12 rounded-full',
  lg: 'size-40 rounded-2xl',
}

function Thumb({ src, alt = '', size = 'md' }) {
  return (
    <img
      src={src || defaultImage}
      alt={alt}
      className={`shrink-0 object-cover ${SIZE_CLASS[size]}`}
    />
  )
}

export default Thumb
