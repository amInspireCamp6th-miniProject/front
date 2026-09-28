import { useEffect, useState, useCallback } from 'react'

import Chip from '../../../components/ui/Chip.jsx'
import ChipGroup from '../../../components/ui/ChipGroup.jsx'
import Modal from '../../../components/ui/Modal.jsx'
import { INGREDIENT_CATEGORY } from '../../ingredient/model/categoryMap.js'
import { formatDaysLeft, isUrgent } from '../../ingredient/model/daysLeft.js'
import recommendRecipes from '../api/recipeApi.js'
import Button from '../../../components/ui/Button.jsx'
import RecipeRecommendationLoading from './RecipeRecommendationLoading.jsx'
import RecipeRecommendationResult from './RecipeRecommendationResult.jsx'

const FILTER_OPTIONS = [
  { value: 'urgent', label: '임박 재료' },
  { value: 'owned', label: '보유 재료' },
]

//선택된 재료의 ID를 가져오는 함수 (컴포넌트 밖: 상태를 안 쓰는 순수 함수라 effect 의존성에 안 들어가도 된다)
function getIngredientIds(ingredients) {
  return ingredients.map((ingredient) => ingredient.ingredientId)
}

// ingredients 는 페이지(HomePage, IngredientListPage)가 이미 불러온 목록을 그대로 넘겨준다
function RecipeRecommendationModal({ isOpen, onClose, ingredients = [] }) {
  const [filter, setFilter] = useState('urgent') //필터 상태

  const [urgentSelectedIds, setUrgentSelectedIds] = useState([]) //uregent ingredient id
  const [ownedSelectedIds, setOwnedSelectedIds] = useState([]) //사용자 선택 ingredient id

  const urgentIngredients = ingredients.filter((ingredient) => isUrgent(ingredient.daysLeft)) //uregent ingredien 값

  const [recommendationStatus, setRecommendationStatus] = useState('idle') //추천 상태 관리
  const [recommendedRecipes, setRecommendedRecipes] = useState([]) //추천 레시피 값
  const [recommendationError, setRecommendationError] = useState(null) //에러 관리

  const visibleIngredients = filter === 'urgent' ? urgentIngredients : ingredients //버튼 클릭 후 보이는 상태

  const selectedIds = filter === 'urgent' ? urgentSelectedIds : ownedSelectedIds //post를 위한 id 필터링

  const hasRecommendationResult = recommendationStatus !== 'idle'

  // 모달을 닫을 때 필터와 추천 결과 초기화
  const handleClose = useCallback(() => {
    setFilter('urgent')
    setRecommendationStatus('idle')
    setRecommendedRecipes([])
    setRecommendationError(null)
    onClose()
  }, [onClose, setFilter, setRecommendationStatus, setRecommendedRecipes, setRecommendationError])

  //모달이 열리는 순간(isOpen false → true) 임박 재료는 전부 선택, 보유 재료 선택은 빈 상태로 시작
  //effect 안에서 setState 하면 렌더가 한 번 더 도니까, "이전 prop 값을 기억해 두고 렌더 중에 비교" 하는 React 권장 패턴을 쓴다
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen)
    if (isOpen) {
      setUrgentSelectedIds(getIngredientIds(urgentIngredients))
      setOwnedSelectedIds([])
    }
  }

  //선택 재료 id post 후 추천 레시피 통신
  async function handleRecommendation() {
    if (selectedIds.length === 0) return

    try {
      setRecommendationStatus('loading')
      setRecommendationError(null)

      const data = await recommendRecipes(selectedIds)

      setRecommendedRecipes(data)
      setRecommendationStatus('success')
    } catch (error) {
      const errorResponse = error.response?.data

      setRecommendationError(errorResponse?.message ?? '레시피 추천에 실패했습니다.')

      setRecommendationStatus('error')
    }
  }

  //ESC입력시 모달 닫기 함수
  useEffect(() => {
    if (!isOpen) return

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, handleClose])

  // 마감임박 식재료 선택 상태로 전환
  function handleIngredientToggle(ingredientId) {
    const setSelectedIds = filter === 'urgent' ? setUrgentSelectedIds : setOwnedSelectedIds

    setSelectedIds((previousIds) => {
      const isSelected = previousIds.includes(ingredientId)

      if (isSelected) {
        return previousIds.filter((id) => id !== ingredientId)
      }

      return [...previousIds, ingredientId]
    })
  }

  // 현재 화면에 보이는 재료를 전부 선택 함수
  function handleSelectAll() {
    const visibleIds = getIngredientIds(visibleIngredients)

    if (filter === 'urgent') {
      setUrgentSelectedIds(visibleIds)
    } else {
      setOwnedSelectedIds(visibleIds)
    }
  }

  // 선택 상태 초기화 함수
  function handleResetSelection() {
    if (filter === 'urgent') {
      setUrgentSelectedIds([])
    } else {
      setOwnedSelectedIds([])
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title="추천 레시피"
      titleId="recipe-modal-title"
      onClose={handleClose}
      variant="bottomSheet"
      scrollMode="custom"
    >
      <div className="shrink-0">
        <ChipGroup
          options={FILTER_OPTIONS}
          value={filter}
          onChange={setFilter}
          aria-label="식재료 필터"
        />
      </div>

      {/* 재료 선택 제목 및 전체 선택/초기화 */}
      <div className="mt-3 flex shrink-0 items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">
          오늘 쓸 재료를 골라주세요{' '}
          <span className="text-green-700">{selectedIds.length}개 선택</span>
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button type="button" onClick={handleSelectAll}>
            전체 선택
          </button>

          <span>|</span>

          <button type="button" onClick={handleResetSelection}>
            초기화
          </button>
        </div>
      </div>

      {/* 식재료 선택목록 */}
      <div
        className={`
        mt-3 min-h-0 flex-auto overflow-y-auto overscroll-contain pr-1
      `}
      >
        <div className="flex flex-wrap content-start gap-2">
          {visibleIngredients.map((ingredient) => {
            const isSelected = selectedIds.includes(ingredient.ingredientId)

            const category = INGREDIENT_CATEGORY[ingredient.categoryId] ?? {
              name: '기타',
              icon: '🍽️',
            }

            return (
              <Chip
                key={ingredient.ingredientId}
                selected={isSelected}
                onClick={() => handleIngredientToggle(ingredient.ingredientId)}
              >
                <span aria-hidden="true">{category.icon}</span>

                <span>{ingredient.productName}</span>

                <span
                  className={
                    isUrgent(ingredient.daysLeft)
                      ? 'rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-600'
                      : isSelected
                        ? 'text-xs text-green-100'
                        : 'text-xs text-gray-500'
                  }
                >
                  {formatDaysLeft(ingredient.daysLeft)}
                </span>
              </Chip>
            )
          })}
        </div>
      </div>

      {hasRecommendationResult && (
        <div className="shrink-0">
          {/* 레시피 추천 버튼 클릭 후 기다리는 상태 spinner*/}
          {recommendationStatus === 'loading' && <RecipeRecommendationLoading />}

          {/* 레시피 추천 버튼 클릭 후 통신 성공 */}
          {recommendationStatus === 'success' && (
            <RecipeRecommendationResult recipes={recommendedRecipes} />
          )}

          {/* 레시피 추천 버튼 클릭 후 통신 실패 */}
          {recommendationStatus === 'error' && (
            <p role="alert" className="mt-6 text-center text-red-500">
              {recommendationError}
            </p>
          )}
        </div>
      )}

      {/* 레시피 추천 버튼*/}
      <Button
        onClick={handleRecommendation}
        disabled={selectedIds.length === 0 || recommendationStatus === 'loading'}
        className="mt-6 w-full shrink-0"
      >
        {recommendationStatus === 'loading'
          ? '추천 중...'
          : `선택한 재료 ${selectedIds.length}개로 추천받기`}
      </Button>
    </Modal>
  )
}

export default RecipeRecommendationModal
