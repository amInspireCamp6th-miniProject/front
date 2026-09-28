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
      title="인식된 상품명, 이게 맞나요?"
      titleId="ocr-product-confirm-title"
      onClose={onRetry}
    >
      {/* Modal children영역 */}

      {/* 상품설명 */}
      <p className="text-sm leading-6 text-gray-500">
        사진에서 인식한 상품명이에요. 맞으면 이대로 등록할게요.
      </p>

      {/* 인식 결과에서 사용자가 수정한 상품명만 보여준다 */}
      <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl bg-gray-50 px-4 py-4">
            <strong className="block truncate text-sm text-gray-900">{product.productName}</strong>
          </div>
        ))}
      </div>

      {/* 버튼영역 */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isSubmitting}>
          다시 확인할게요
        </Button>

        <Button size="sm" onClick={onConfirm} disabled={isSubmitting || products.length === 0}>
          {isSubmitting ? '등록 중...' : '이대로 등록'}
        </Button>
      </div>
    </Modal>
  )
}

export default OcrProductConfirmModal
