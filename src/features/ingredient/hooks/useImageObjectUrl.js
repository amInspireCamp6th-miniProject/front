import { useEffect, useState } from 'react'

import api from '../../../api/axios'

// 백엔드 사진 주소('/api/v1/ingredients/15/image') → <img src> 에 넣을 임시 URL.
// <img> 태그는 Authorization 헤더를 못 붙여서 axios 로 바이트(blob)를 받은 뒤
// URL.createObjectURL 로 브라우저 메모리 안의 주소를 만든다.
// 컴포넌트가 사라지거나 주소가 바뀌면 revokeObjectURL 로 메모리를 돌려준다
function useImageObjectUrl(imageUrl) {
  // 어떤 주소로 만든 임시 URL 인지 같이 기억한다.
  // 주소가 바뀌면 이전 결과를 쓰지 않게 되고, effect 안에서 초기화용 setState 를 안 해도 된다
  const [loaded, setLoaded] = useState({ imageUrl: null, objectUrl: '' })

  useEffect(() => {
    if (!imageUrl) return undefined

    let createdUrl = ''
    let isCancelled = false

    async function load() {
      try {
        const response = await api.get(imageUrl, { responseType: 'blob' })
        if (isCancelled) return

        createdUrl = URL.createObjectURL(response.data)
        setLoaded({ imageUrl, objectUrl: createdUrl })
      } catch {
        // 실패하면 기본 이미지가 나오도록 빈 값 유지
      }
    }
    load()

    return () => {
      isCancelled = true
      if (createdUrl) URL.revokeObjectURL(createdUrl)
    }
  }, [imageUrl])

  return loaded.imageUrl === imageUrl ? loaded.objectUrl : ''
}

export default useImageObjectUrl
