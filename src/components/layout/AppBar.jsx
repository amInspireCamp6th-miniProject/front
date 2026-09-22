import bell from '../../assets/icons/bell.svg'
function AppBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
      <span
        aria-hidden="true"
        className="flex size-7 items-center justify-center rounded-lg bg-green-50 text-sm"
      >
        🥬
      </span>
      <span className="font-bold">Fridge Recipe</span>
      <button
        type="button"
        aria-label="알림"
        // transition-colors 는 색변화를 부드럽게 해줌
        className="flex justify-center items-center size-7 rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
      >
        <img src={bell} alt="" width="20" height="20" />
      </button>
    </header>
  )
}

export default AppBar
