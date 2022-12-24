import classNames from 'classnames'
import { FC } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { Item, Todo } from '../../api/api'
import Progress from '../Progress'
import KanbanCardItemMenu from './KanbanCardItemMenu'

type Props = {
  item: Item
  todo: Todo
  provided: DraggableProvided
}

const KanbanCardItem: FC<Props> = ({ provided, item, todo }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={classNames(
        'bg-neutral-20 border border-neutral-40 p-2 text-neutral-90',
        'font-bold text-sm leading-6',
        'transition-all duration-300 ease',
        'my-1.5 rounded',
      )}
    >
      <div>{item.name}</div>
      <div className="w-full border-t border-dashed border-t-neutral-40 mt-2 mb-3"></div>
      <div className="flex flex-row gap-6.5">
        <Progress
          className="flex-1"
          percentage={item.progress_percentage || 0}
          variant={
            (item?.progress_percentage || 0) >= 100 ? 'success' : 'primary'
          }
        />

        <KanbanCardItemMenu item={item} todo={todo} />
      </div>
    </div>
  )
}

export default KanbanCardItem
