function AppBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
      <span className="font-bold">Fridge Recipe</span>
      <button type="button" aria-label="알림" className="text-sm text-gray-400">
        알림
      </button>
    </header>
  )
}

export default AppBar
