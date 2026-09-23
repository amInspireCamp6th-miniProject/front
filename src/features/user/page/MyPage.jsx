import Icon from '../../../components/ui/Icon'
import Button from '../../../components/ui/Button'

function MyPage() {
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-full bg-green-50 text-green-800 flex items-center justify-center">
          <Icon name="user" />
        </div>
        <div>
          <p className="text-[17px] font-bold text-gray-900">김냉장님</p>
          <p className="text-[13px] text-gray-500">user@email.com</p>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        <Button className="w-full flex items-center gap-3 py-3 text-left">
          <Icon name="user" className="h-5 w-5 text-gray-500" />
          <span className="flex-1 text-[14px] font-medium text-gray-900">내 정보 수정</span>
          <Icon name="chevronRight" className="h-4 w-4 text-gray-400" />
        </Button>

        <Button className="w-full flex items-center gap-3 py-3 text-left opacity-50" disabled>
          <Icon name="book" className="h-5 w-5 text-gray-500" />
          <span className="flex-1 text-[14px] font-medium text-gray-900">
            받은 레시피 <span className="text-[11px] text-gray-400">(보류)</span>
          </span>
          <Icon name="chevronRight" className="h-4 w-4 text-gray-400" />
        </Button>

        <Button className="w-full flex items-center gap-3 py-3 text-left">
          <Icon name="bell" className="h-5 w-5 text-gray-500" />
          <span className="flex-1 text-[14px] font-medium text-gray-900">공지사항</span>
          <Icon name="chevronRight" className="h-4 w-4 text-gray-400" />
        </Button>

        <Button className="w-full flex items-center gap-3 py-3 text-left">
          <Icon name="x" className="h-5 w-5 text-red-600" />
          <span className="flex-1 text-[14px] font-medium text-red-600">로그아웃</span>
        </Button>
      </div>
    </div>
  )
}

export default MyPage
