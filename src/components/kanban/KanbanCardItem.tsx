import classNames from 'classnames'
import { FC } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { Item } from '../../api/api'

const KanbanCardItem: FC<{
  item: Item
  provided: DraggableProvided
}> = ({ provided, item }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={classNames(
        'bg-gray-50 border border-gray-200 p-2 text-neutral-100 text-sm',
        'transition-all duration-300 ease',
        'my-1',
      )}
    >
      <div>{item.name}</div>
    </div>
  )
}

export default KanbanCardItem
