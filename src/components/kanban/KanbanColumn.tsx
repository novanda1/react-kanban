import classNames from 'classnames'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Todo } from '../../api/api'
import IconAddCircle from '../../icons/IconAddCircle'
import TaskModalWrite from '../modal/TaskModalWrite'
import KanbanCardList from './KanbanCardList'
import TitleBadge from './TitleBadge'
import { indexToTypeMap, kanbanTypeClasses } from './utils'

type Props = {
  index: number
  todo: Todo
}

const KanbanColumn: FC<Props> = ({ index, todo }) => {
  const type = indexToTypeMap[index]

  return (
    <Draggable
      draggableId={'todoid-' + todo.id}
      index={index}
      isDragDisabled={true}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={classNames(
              'p-4 border w-full h-max rounded',
              kanbanTypeClasses[type].card,
              'transtition-all duration-300 ease',
            )}
          >
            <TitleBadge {...provided.dragHandleProps} variant={type}>
              {todo.title}
            </TitleBadge>
            <p className="font-bold text-xs mt-2 leading-5">
              {todo.description}
            </p>

            <KanbanCardList todo={todo} listType="ITEM" type={type} />

            <TaskModalWrite todo={todo} operation="create">
              <button className="flex gap-1 items-center mt-3 text-xs">
                <IconAddCircle />
                New Task
              </button>
            </TaskModalWrite>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default KanbanColumn
