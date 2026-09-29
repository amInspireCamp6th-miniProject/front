import { useEffect, useState } from 'react'

/**
 * File/Blob을 <img> 미리보기에 사용할 수 있는 Object URL로 바꾼다.
 * 입력이 바뀌거나 컴포넌트가 해제될 때 URL.revokeObjectURL로 브라우저 메모리를 반납한다.
 * @param {Blob | File | null} blob 미리보기할 이미지 데이터
 * @returns {string} 현재 입력에 대해 생성된 Object URL, 준비 전이거나 입력이 없으면 빈 문자열
 */
function useObjectUrl(blob) {
  // 이전 Blob의 URL을 새 Blob에 잠시라도 재사용하지 않도록 Blob과 URL을 함께 기억한다.
  const [loaded, setLoaded] = useState({ blob: null, objectUrl: '' })

  useEffect(() => {
    if (!blob) return undefined

    let isCancelled = false
    let objectUrl = ''

    // StrictMode는 effect를 설정 후 즉시 정리하고 다시 실행할 수 있다.
    // 따라서 다음 microtask까지 유효한 setup일 때만 URL을 생성해, 폐기된 setup의 URL 누수를 막는다.
    queueMicrotask(() => {
      if (isCancelled) return

      objectUrl = URL.createObjectURL(blob)
      setLoaded({ blob, objectUrl })
    })

    return () => {
      isCancelled = true
      // 사진 항목 제거·새 파일 선택·페이지 이동으로 effect가 정리될 때 생성했던 URL을 반납한다.
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [blob])

  return loaded.blob === blob ? loaded.objectUrl : ''
}

export default useObjectUrl
