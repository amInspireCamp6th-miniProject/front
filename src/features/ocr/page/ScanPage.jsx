import { useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import ScanLoading from '../ui/ScanLoading'

function ScanPage() {
  const cameraInputRef = useRef(null)
  const albumInputRef = useRef(null)
  const [photos, setPhotos] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  function handleFiles(e) {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    setIsAnalyzing(true)
    setPhotos(files)
    e.target.value = ''
  }

  if (isAnalyzing) return <ScanLoading photos={photos} />

  return (
    <div className="px-5 pt-6">
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6">
        <Icon name="camera" className="mb-1 h-14 w-14 text-gray-400" />
        <p className="text-center text-[15px] font-bold text-gray-900">
          재료 하나만 화면에 담아주세요
        </p>
        <p className="text-center text-[13px] text-gray-500">한 장에 하나씩 인식해요</p>
        <p className="mt-3 text-center text-[12px] leading-relaxed text-gray-400">
          여러 개를 한 번에 찍으면 정확도가 떨어져요
          <br />
          앨범에서 여러 장을 골라 한꺼번에 담을 수도 있어요
        </p>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFiles}
      />
      <input
        ref={albumInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <div className="mb-1 mt-4 flex gap-2">
        <Button
          onClick={() => cameraInputRef.current.click()}
          className="h-12 flex-1 gap-2 rounded-md bg-green-800 text-[15px] font-bold text-white"
        >
          <Icon name="camera" className="h-5 w-5" />
          촬영하기
        </Button>
        <Button
          onClick={() => albumInputRef.current.click()}
          className="h-12 flex-1 gap-2 rounded-md border border-gray-200 bg-white text-[14px] font-bold text-gray-900"
        >
          <Icon name="inventory" className="h-5 w-5" />
          앨범에서 여러 장 선택
        </Button>
      </div>

      <p className="mb-4 text-center text-[12px] text-gray-400">
        촬영한 사진은 AI 식재료 인식에 사용되며 저장되지 않아요
      </p>
    </div>
  )
}

export default ScanPage
