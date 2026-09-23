function ScanLoading() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-10"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-9 w-9 animate-spin rounded-full border-4 border-green-100 border-t-green-700"
        aria-hidden="true"
      />
      <p className="text-center text-sm font-medium text-gray-900">AI가 식재료를 분석하고 있어요</p>
      <p className="text-center text-xs text-gray-400">
        사진 속 재료를 인식해서 목록으로 정리할게요
      </p>
    </div>
  )
}

export default ScanLoading
