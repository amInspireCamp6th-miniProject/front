import { useEffect, useState, useCallback } from 'react'

import Modal from '../../../components/ui/Modal.jsx'
import RecipeIngredientFilter from './RecipeIngredientFilter.jsx'
import getIngredients from '../../ingredient/api/ingredientApi.js'
import { INGREDIENT_CATEGORY } from '../../ingredient/model/categoryMap.js'
import recommendRecipes from '../api/recipeApi.js'
import Button from '../../../components/ui/Button.jsx'
import RecipeRecommendationLoading from './RecipeRecommendationLoading.jsx'
import RecipeRecommendationResult from './RecipeRecommendationResult.jsx'

function RecipeRecommendationModal({ isOpen, onClose }) {
  const [filter, setFilter] = useState('urgent') //필터 상태
  const [ingredients, setIngredients] = useState([]) //ingredients 데이터 관리
  const [isIngredientLoading, setIsIngredientLoading] = useState(false) //ingredients 로딩상태관리
  const [ingredientError, setIngredientError] = useState(null) //ingredients 통신에러상태관리

  const URGENT_DAYS_LIMIT = 5

  const [urgentSelectedIds, setUrgentSelectedIds] = useState([]) //uregent ingredient id
  const [ownedSelectedIds, setOwnedSelectedIds] = useState([]) //사용자 선택 ingredient id

  const urgentIngredients = ingredients.filter(isUrgentIngredient) //uregent ingredien 값

  const [recommendationStatus, setRecommendationStatus] = useState('idle') //추천 상태 관리
  const [recommendedRecipes, setRecommendedRecipes] = useState([]) //추천 레시피 값
  const [recommendationError, setRecommendationError] = useState(null) //에러 관리

  const visibleIngredients = filter === 'urgent' ? urgentIngredients : ingredients //버튼 클릭 후 보이는 상태

  const selectedIds = filter === 'urgent' ? urgentSelectedIds : ownedSelectedIds //post를 위한 id 필터링

  // 모달을 닫을 때 필터와 추천 결과 초기화
  const handleClose = useCallback(() => {
    setFilter('urgent')
    setRecommendationStatus('idle')
    setRecommendedRecipes([])
    setRecommendationError(null)
    onClose()
  }, [onClose, setFilter, setRecommendationStatus, setRecommendedRecipes, setRecommendationError])

  //임박재료 구분 함수
  function isUrgentIngredient(ingredient) {
    return ingredient.daysLeft >= 0 && ingredient.daysLeft <= URGENT_DAYS_LIMIT
  }

  //선택된 재료의 ID를 가져오는 함수
  function getIngredientIds(ingredients) {
    return ingredients.map((ingredient) => ingredient.ingredientId)
  }

  //식료품 데이터 상세 조회 통신
  useEffect(() => {
    //modal을 컴포넌트로 쓰면 항상 open 상태라서 렌더링 상태 중단
    if (!isOpen) return undefined

    async function loadIngredients() {
      try {
        setIsIngredientLoading(true)
        setIngredientError(null)

        const data = await getIngredients()

        setIngredients(data)
        console.log('식재료 조회 결과:', data)

        const urgentIds = getIngredientIds(data.filter(isUrgentIngredient))

        setUrgentSelectedIds(urgentIds)
        setOwnedSelectedIds([])
      } catch (err) {
        const errorResponse = err.response?.data
        console.error('오류 코드:', errorResponse?.code)
        console.error('오류 내용:', errorResponse?.message)
        console.error('필드 오류:', errorResponse?.errors)
      } finally {
        setIsIngredientLoading(false)
      }
    }

    loadIngredients()
  }, [isOpen])

  //선택 재료 id post 후 추천 레시피 통신
  async function handleRecommendation() {
    if (selectedIds.length === 0) return

    try {
      setRecommendationStatus('loading')
      setRecommendationError(null)

      console.log('추천 요청:', {
        ingredientIds: selectedIds,
      })

      const data = await recommendRecipes(selectedIds)

      setRecommendedRecipes(data)
      setRecommendationStatus('success')

      console.log('추천 응답:', data)
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

  //d-day 표기 함수
  function formatDaysLeft(daysLeft) {
    if (daysLeft === 0) {
      return 'D-Day'
    }

    if (daysLeft < 0) {
      return `D+${Math.abs(daysLeft)}`
    }

    return `D-${daysLeft}`
  }

  return (
    <Modal
      isOpen={isOpen}
      title="추천 레시피"
      titleId="recipe-modal-title"
      onClose={handleClose}
      variant="bottomSheet"
    >
      <RecipeIngredientFilter value={filter} onChange={setFilter} />

      {ingredientError && (
        <p role="alert" className="mt-3 text-sm text-red-500">
          {ingredientError}
        </p>
      )}

      {/* 재료 선택 제목 및 전체 선택/초기화 */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">
          오늘 쓸 재료를 골라주세요{' '}
          <span className="text-green-700">{selectedIds.length}개 선택</span>
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            onClick={handleSelectAll}
            disabled={isIngredientLoading}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            전체 선택
          </button>

          <span>|</span>

          <button
            type="button"
            onClick={handleResetSelection}
            disabled={isIngredientLoading}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 식재료 선택목록 */}
      <div className="mt-3 flex flex-wrap gap-2">
        {visibleIngredients.map((ingredient) => {
          const isSelected = selectedIds.includes(ingredient.ingredientId)

          const category = INGREDIENT_CATEGORY[ingredient.categoryId] ?? {
            name: '기타',
            icon: '🍽️',
          }

          return (
            <button
              key={ingredient.ingredientId}
              type="button"
              onClick={() => handleIngredientToggle(ingredient.ingredientId)}
              className={
                isSelected
                  ? 'inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-2 text-white'
                  : 'inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-gray-700'
              }
            >
              <span aria-hidden="true">{category.icon}</span>

              <span>{ingredient.productName}</span>

              <span
                className={
                  isUrgentIngredient(ingredient)
                    ? 'rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-600'
                    : isSelected
                      ? 'text-xs text-green-100'
                      : 'text-xs text-gray-500'
                }
              >
                {formatDaysLeft(ingredient.daysLeft)}
              </span>
            </button>
          )
        })}
      </div>

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

      {/* 레시피 추천 버튼*/}
      <Button
        type="button"
        onClick={handleRecommendation}
        disabled={selectedIds.length === 0 || recommendationStatus === 'loading'}
        className="mt-6 w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white"
      >
        {recommendationStatus === 'loading'
          ? '추천 중...'
          : `선택한 재료 ${selectedIds.length}개로 추천받기`}
      </Button>
    </Modal>
  )
}

export default RecipeRecommendationModal
