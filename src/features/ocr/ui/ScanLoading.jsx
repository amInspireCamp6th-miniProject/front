import Spinner from '../../../components/ui/Spinner.jsx'

function ScanLoading({ photos = [] }) {
  return (
    <div
      className="
        flex 
        min-h-[60vh] 
        flex-col 
        items-center 
        justify-center 
        gap-5 
        px-10"
      role="status"
      aria-live="polite"
    >
      <div className="flex max-w-[280px] flex-wrap justify-center gap-2">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={URL.createObjectURL(photo)}
            alt={`고른 사진 ${index + 1}`}
            className="h-16 w-16 rounded-lg object-cover"
          />
        ))}
      </div>

      {/* spinner 컴포넌트 사용 */}
      <Spinner />

      <p className="text-center text-sm font-medium text-gray-900">AI가 식재료를 분석하고 있어요</p>

      <p className="text-center text-xs text-gray-400">
        사진 속 재료를 인식해서 목록으로 정리할게요
      </p>
    </div>
  )
}

export default ScanLoading
