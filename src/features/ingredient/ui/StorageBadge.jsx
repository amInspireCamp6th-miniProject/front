import Badge from '../../../components/ui/Badge'
import { STORAGE } from '../model/storage'

function StorageBadge({ storage }) {
  const { label, variant } = STORAGE[storage]
  return <Badge variant={variant}>{label}</Badge>
}
export default StorageBadge
