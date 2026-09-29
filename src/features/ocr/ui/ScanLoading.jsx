import Spinner from '../../../components/ui/Spinner.jsx'
import useObjectUrl from '../../../hooks/useObjectUrl.js'

// 기존에는 JSX 렌더링마다 createObjectURL을 호출하고 해제하지 않았다.
// 각 미리보기를 컴포넌트로 분리해 사진이 바뀌거나 로딩 화면이 사라질 때 훅이 URL을 회수하게 했다.
function LoadingPhoto({ photo, index }) {
  const photoUrl = useObjectUrl(photo)

  // effect가 Object URL을 만들기 전에도 레이아웃이 흔들리지 않도록 같은 크기의 자리를 유지한다.
  if (!photoUrl) return <div className="h-16 w-16 rounded-lg bg-gray-100" aria-hidden="true" />

  return (
    <img
      src={photoUrl}
      alt={`고른 사진 ${index + 1}`}
      className="h-16 w-16 rounded-lg object-cover"
    />
  )
}

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
          <LoadingPhoto
            key={index}
            photo={photo}
            index={index}
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
