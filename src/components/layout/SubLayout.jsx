import { Outlet, useMatches } from 'react-router-dom'
import AppBar from './AppBar'
import PageHeader from './PageHeader'

function SubLayout() {
  const matches = useMatches()
  const title = matches.at(-1)?.handle?.title ?? ''
  return (
    <>
      <AppBar />
      <PageHeader title={title} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </>
  )
}

export default SubLayout
