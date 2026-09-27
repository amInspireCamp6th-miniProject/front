//모달 테스트 페이지
//onRetry => 다시확인할께요 클릭시 시행함수
//onConfirm => 이대로 등록 클릭시 시행함수

import { useState } from 'react'
import Button from '../../../components/ui/Button.jsx'
import recognizeIngredients from '../api/ocrApi.js'
import OcrProductConfirmModal from '../ui/OcrProductConfirmModal.jsx'

function ScanPage() {
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = async () => {
    try {
      setIsLoading(true)

      const data = await recognizeIngredients()

      // 현재 배열 응답과 향후 객체 응답을 모두 테스트할 수 있음
      const recognizedProducts = Array.isArray(data) ? data : data.products

      setProducts(recognizedProducts)
      setIsModalOpen(true)
    } catch (error) {
      console.error('더미 데이터 조회 실패:', error.response?.data ?? error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    console.log('다시 촬영 선택')

    setIsModalOpen(false)
    setProducts([])
  }

  const handleConfirm = () => {
    console.log('등록 예정 데이터:', products)

    setIsModalOpen(false)
    setProducts([])
  }

  return (
    <main className="p-5">
      <Button
        className="h-12 rounded-xl bg-green-700 px-5 font-semibold text-white"
        onClick={handleOpenModal}
        disabled={isLoading}
      >
        {isLoading ? '불러오는 중...' : 'OCR 모달 테스트'}
      </Button>

      <OcrProductConfirmModal
        isOpen={isModalOpen}
        products={products}
        onRetry={handleRetry}
        onConfirm={handleConfirm}
        isSubmitting={false}
      />
    </main>
  )
}

export default ScanPage
