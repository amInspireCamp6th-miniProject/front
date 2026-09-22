import { useParams } from 'react-router-dom'

function IngredientDetailPage() {
  const { id } = useParams()
  return <div className="p-5 text-sm text-gray-400">식재료 상세 화면 자리 (id : {id})</div>
}

export default IngredientDetailPage
