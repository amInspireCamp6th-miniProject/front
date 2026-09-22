import { useEffect, useState, useCallback } from 'react'

import Modal from '../../../components/ui/Modal.jsx'
import RecipeIngredientFilter from './RecipeIngredientFilter.jsx'

function RecipeRecommendationModal({ isOpen, onClose }) {
  const [filter, setFilter] = useState('all')

  const handleClose = useCallback(() => {
    setFilter('all')
    onClose()
  }, [onClose])

  //ESC 입력시 창닫기 처리
  useEffect(() => {
    //modal을 컴포넌트로 쓰면 항상 open 상태라서 렌더링 상태 중단
    if (!isOpen) return undefined

    //ESC입력시 처리
    const handleEscapeKey = (e) => {
      //esc누르면 onClose={() => setIsOpen(false)} 시행으로 닫음
      if (e.key === 'Escape') handleClose()
    }

    //keydown 이벤트리스너 등록
    document.addEventListener('keydown', handleEscapeKey)

    //keydown 지우는 이벤트 리스너 등록
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [isOpen, handleClose])

  return (
    <Modal
      isOpen={isOpen}
      title="추천 레시피"
      titleId="recipe-modal-title"
      onClose={handleClose}
      variant="bottomSheet"
    >
      <RecipeIngredientFilter value={filter} onChange={setFilter} />

      {/* 필터 아래에 식재료 목록이 들어갈 자리 */}
      <div className="mt-4">
        <p>현재 선택된 필터: {filter}</p>
      </div>
    </Modal>
  )
}

export default RecipeRecommendationModal
