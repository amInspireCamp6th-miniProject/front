import { Link } from 'react-router-dom'
import Thumb from '../../../components/ui/Thumb'
import Dday from './Dday'
import StorageBadge from './StorageBadge'

function IngredientRow({ ingredient, showQuantity = false }) {
  const { ingredientId, productName, imageUrl, quantity, unit, daysLeft, storage } = ingredient
  return (
    <Link
      to={`/ingredients/${ingredientId}`}
      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:bg-gray-50"
    >
      <Thumb src={imageUrl} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-bold text-gray-900">{productName}</span>
        {showQuantity && (
          <span className="text-sm text-gray-500">
            {quantity}
            {unit}
          </span>
        )}
      </div>
      <Dday daysLeft={daysLeft} />
      <StorageBadge storage={storage} />
    </Link>
  )
}

export default IngredientRow
