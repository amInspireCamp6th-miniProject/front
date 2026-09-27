import { useEffect, useState } from 'react'
import getIngredients from '../api/ingredientApi'

function useIngredients() {
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    async function load() {
      try {
        const data = await getIngredients()
        setIngredients(data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])
  return { ingredients, isLoading, error }
}
export default useIngredients
