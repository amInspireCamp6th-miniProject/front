function StatCard({ label, value, highlight = false }) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-4">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-3xl font-bold ${highlight ? 'text-red-500' : 'text-gray-900'}`}>
        {value}
      </span>
    </div>
  )
}

export default StatCard
