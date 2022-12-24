import { FC } from 'react'

const KanbanCardListEmpty: FC = () => {
  return (
    <div className="w-full bg-neutral-20 border-neutral-40 border rounded py-2 px-4">
      <p className="text-sm leading-6 text-neutral-70">No Task</p>
    </div>
  )
}

export default KanbanCardListEmpty
