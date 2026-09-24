import Spinner from '../../../components/ui/Spinner.jsx'

function RecipeRecommendationLoading() {
  return (
    <div
      className="
        flex 
        min-h-48 
        flex-col 
        items-center 
        justify-center"
      role="status"
      aria-live="polite"
    >
      {/* Spinner 컴포넌트 사용 */}
      <Spinner />

      <p className="mt-4 font-semibold text-gray-900">레시피를 찾고 있어요...</p>
      <p className="mt-2 text-sm text-gray-400">선택한 재료로 만들 수 있는 조합을 계산 중이에요</p>
    </div>
  )
}

export default RecipeRecommendationLoading
