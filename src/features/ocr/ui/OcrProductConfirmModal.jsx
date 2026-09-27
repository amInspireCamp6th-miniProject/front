import Button from '../../../components/ui/Button.jsx'
import Modal from '../../../components/ui/Modal.jsx'

function OcrProductConfirmModal({
  isOpen,
  products = [],
  onRetry,
  onConfirm,
  isSubmitting = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      title="인식된 상품명을 확인합니다"
      titleId="ocr-product-confirm-title"
      onClose={onRetry}
    >
      {/* Modal children영역 */}

      {/* 상품설명 */}
      <p className="text-sm leading-6 text-gray-500">
        사진 속 문구를 상품명으로 인식했어요. 맞으면 이대로 등록할게요.
      </p>

      {/* 인식된 상품목록 표출 */}
      <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
        {products.map((product, index) => (
          <div key={`${product.productName}-${index}`} className="rounded-xl bg-gray-50 px-4 py-4">
            <strong className="text-sm text-gray-900">{product.productName}</strong>
          </div>
        ))}
      </div>

      {/* 버튼영역 */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button
          className="
                        h-12 
                        rounded-xl 
                        bg-gray-100 
                        font-semibold 
                        text-gray-600"
          onClick={onRetry}
          disabled={isSubmitting}
        >
          다시 확인할게요
        </Button>

        <Button
          className="
                        h-12 
                        rounded-xl 
                        bg-green-700 
                        font-semibold 
                        text-white"
          onClick={onConfirm}
          disabled={isSubmitting || products.length === 0}
        >
          {isSubmitting ? '등록 중...' : '이대로 등록'}
        </Button>
      </div>
    </Modal>
  )
}

export default OcrProductConfirmModal
