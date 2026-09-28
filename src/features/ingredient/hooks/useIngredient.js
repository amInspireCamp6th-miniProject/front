import { useEffect, useState } from 'react'

import { getIngredient } from '../api/ingredientApi'

// 재료 하나 조회. 상세/수정 페이지에서 쓴다
function useIngredient(id) {
  const [ingredient, setIngredient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // id 가 바뀌면(다른 재료 페이지로 이동) 다시 불러온다
  useEffect(() => {
    async function load() {
      try {
        const data = await getIngredient(id)
        setIngredient(data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  return { ingredient, isLoading, error }
}

export default useIngredient
