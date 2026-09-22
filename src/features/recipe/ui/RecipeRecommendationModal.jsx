import { useEffect, useState, useCallback } from 'react'

import Modal from '../../../components/ui/Modal.jsx'
import RecipeIngredientFilter from './RecipeIngredientFilter.jsx'
import getIngredients from '../../ingredient/api/IngredientApi.js'
import { INGREDIENT_CATEGORY } from '../../ingredient/model/categoryMap.js'



function RecipeRecommendationModal({ isOpen, onClose }) {
  const [filter, setFilter] = useState('urgent') //필터 상태
  const [ingredients, setIngredients] = useState([]) //ingredients 데이터 관리
  const [isIngredientLoading, setIsIngredientLoading] = useState(false) //ingredients 로딩상태관리
  const [ingredientError, setIngredientError] = useState(null) //ingredients 통신에러상태관리

  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false) //레시피 추천 로딩 상태

  const URGENT_DAYS_LIMIT = 5

  const [urgentSelectedIds, setUrgentSelectedIds] = useState([]) //uregent ingredient id
  const [ownedSelectedIds, setOwnedSelectedIds] = useState([]) //사용자 선택 ingredient id

  const urgentIngredients = ingredients.filter(isUrgentIngredient) //uregent ingredien 값

  // 모달 열렀을때 기본 필터링 설정
  const handleClose = useCallback(() => {
    setFilter('urgent')
    onClose()
  }, [onClose])

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
        console.error('식재료 조회 실패:', err)

        setIngredientError(err.response?.data?.message ?? '식재료 목록을 불러오지 못했습니다.')
      } finally {
        setIsIngredientLoading(false)
      }
    }

    loadIngredients()
  }, [isOpen])

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

  const visibleIngredients = filter === 'urgent' ? urgentIngredients : ingredients

  const selectedIds = filter === 'urgent' ? urgentSelectedIds : ownedSelectedIds

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
    >
      <RecipeIngredientFilter value={filter} onChange={setFilter} />

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
            
          const category =
            INGREDIENT_CATEGORY[ingredient.categoryId] ?? {
              name: '기타',
              icon: '🍽️',
            }

          return (
        <button
          key={ingredient.ingredientId}
          type="button"
          onClick={() =>
            handleIngredientToggle(ingredient.ingredientId)}
          className={
            isSelected
              ? 'inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-2 text-white'
              : 'inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-gray-700'
          }
        >
          <span aria-hidden="true">{category.icon}</span>
          <span>{ingredient.productName}</span>
          <span>D-{ingredient.daysLeft}</span>
        </button>
      )
        })}
      </div>
    </Modal>
  )
}

export default RecipeRecommendationModal
