import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/Button'
import Icon from '../../../components/ui/Icon'
import useScanStore from '../../../stores/useScanStore'
import {
  IMAGE_PROCESSING_MESSAGE,
  MAX_SOURCE_IMAGE_SIZE,
  SOURCE_IMAGE_SIZE_MESSAGE,
  SOURCE_IMAGE_TYPE_MESSAGE,
  isSupportedSourceImageFile,
  prepareImageForUpload,
} from '../../ingredient/model/image'
import recognizeIngredients from '../api/ocrApi'
import ScanLoading from '../ui/ScanLoading'

function ScanPage() {
  const cameraInputRef = useRef(null)
  const albumInputRef = useRef(null)
  // 로딩 미리보기에도 원본이 아닌 OCR에 보낼 전처리 JPEG만 보관한다.
  const [photos, setPhotos] = useState([])
  // 이미지 변환부터 OCR 응답까지 전체 구간에서 중복 선택을 막고 로딩 화면을 보여준다.
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const navigate = useNavigate()
  const setScanResults = useScanStore((state) => state.setScanResults)

  async function handleFiles(e) {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // 기존에는 원본에 JPEG/PNG·5MB 서버 제한을 바로 적용했다.
    // 이제 원본은 HEIC/HEIF를 포함해 검증하고, 최종 5MB 제한은 전처리가 끝난 JPEG에 적용한다.
    if (!files.every(isSupportedSourceImageFile)) {
      alert(SOURCE_IMAGE_TYPE_MESSAGE)
      e.target.value = ''
      return
    }

    if (files.some((file) => file.size > MAX_SOURCE_IMAGE_SIZE)) {
      // 20MB를 넘는 원본은 디코딩 전에 막아 모바일 메모리 사용량이 급격히 커지는 것을 피한다.
      alert(SOURCE_IMAGE_SIZE_MESSAGE)
      e.target.value = ''
      return
    }

    // 원본을 읽는 순간부터 로딩 상태로 전환하고, 이전 미리보기 파일은 비운다.
    setIsAnalyzing(true)
    setPhotos([])
    e.target.value = ''

    // 원본과 분리해 전처리된 File 객체만 순서대로 모은다.
    const processedFiles = []

    try {
      // Promise.all로 고해상도 이미지를 동시 디코딩하면 모바일 메모리가 급증할 수 있어 한 장씩 순차 변환한다.
      // 각 반환값은 image/jpeg이며, 이 배열을 이어지는 OCR과 결과 상태에 그대로 사용한다.
      for (const file of files) {
        processedFiles.push(await prepareImageForUpload(file))
      }
      setPhotos(processedFiles)
    } catch (error) {
      // 형식 변환·디코딩·압축 중 하나라도 실패하면 OCR을 호출하지 않고 선택 화면으로 복귀한다.
      console.error('사진 처리 실패:', error)
      alert(IMAGE_PROCESSING_MESSAGE)
      setIsAnalyzing(false)
      return
    }

    try {
      // 기존처럼 여러 장 OCR 호출은 recognizeIngredients가 담당하되, 원본이 아닌 전처리 완료 JPEG를 전달한다.
      const data = await recognizeIngredients(processedFiles)

      // 응답 배열 순서 = 보낸 파일 순서. 그래서 index 로 사진과 결과를 짝짓는다.
      // 기존의 files[index] 대신 processedFiles[index]를 저장해 OCR 입력과 최종 DB 등록 사진이 동일하게 한다.
      const results = data.map((item, index) => ({
        photo: processedFiles[index],
        productName: item.productName,
        ingredientName: item.ingredientName,
        category: item.category,
      }))
      setScanResults(results)
      navigate('/scan/result')
    } catch (error) {
      console.error('인식 실패:', error)
      alert('재료 인식에 실패했어요. 다시 시도해주세요.')
      setIsAnalyzing(false)
    }
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

      {/* 카메라는 후면 촬영 UX를 유지하고, 원본 선택 단계에서 HEIC/HEIF도 노출하도록 accept를 확장했다. */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif"
        capture="environment"
        className="hidden"
        onChange={handleFiles}
      />
      {/* 앨범의 여러 장 선택은 유지하며, 선택된 파일은 위에서 순차 전처리한다. */}
      <input
        ref={albumInputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <div className="mb-1 mt-4 flex gap-2">
        <Button variant="primary" onClick={() => cameraInputRef.current.click()} className="flex-1">
          <Icon name="camera" className="h-5 w-5" />
          촬영하기
        </Button>
        <Button
          variant="outline"
          onClick={() => albumInputRef.current.click()}
          className="flex-1 px-3! text-sm!"
        >
          <Icon name="inventory" className="h-5 w-5" />
          앨범에서 여러 장 선택
        </Button>
      </div>

      {/* 기존의 '저장되지 않아요'는 인식 후 동일 사진을 등록 API로 보내는 실제 흐름과 달라 정확한 문구로 바꿘다. */}
      <p className="mb-4 text-center text-[12px] text-gray-400">
        촬영한 사진은 식재료 인식 및 등록 사진으로 사용돼요.
      </p>
    </div>
  )
}

export default ScanPage
