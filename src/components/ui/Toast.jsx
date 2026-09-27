import { useEffect, useState } from 'react'

function Toast({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[13px] font-medium px-4 py-2.5 rounded-full">
      {message}
    </div>
  )
}

export default Toast
