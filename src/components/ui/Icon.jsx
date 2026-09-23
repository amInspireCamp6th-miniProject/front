const PATHS = {
  chevronLeft: <path d="M15 18l-6-6 6-6" />,
  chevronRight: <path d="M9 18l6-6-6-6" />,
  camera: (
    <>
      <path d="M4 7h3l2-2h6l2 2h3v12H4V7z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  pencil: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  book: (
    <>
      <path d="M4 6a2 2 0 0 1 2-2h5v16H6a2 2 0 0 1-2-2z" />
      <path d="M20 6a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 0 2-2z" />
    </>
  ),
  bell: (
    <>
      <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
}

export default function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  )
}
