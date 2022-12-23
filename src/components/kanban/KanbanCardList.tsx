import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Todo } from '../../api/api'
import { useItemLocal, useItems } from '../../api/useItems'
import KanbanCardItem from './KanbanCardItem'
import { KanbanType } from './utils'

type Props = {
  listId?: string
  listType: string
  todo: Todo
  type: KanbanType
}

const KanbanCardList: FC<Props> = ({
  listId = 'LIST',
  listType,
  todo,
  type,
}) => {
  const { items, isLoading } = useItems(todo.id)
  const { getByTodoId } = useItemLocal()

  return (
    <Droppable droppableId={'todoid-' + todo.id} type={listType}>
      {(dropProvided) => (
        <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
          {isLoading && 'Loading items...'}

          <div className="inline-flex flex-col mt-4">
            {getByTodoId(todo.id)?.items?.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(dropProvided) => (
                  <KanbanCardItem provided={dropProvided} item={item} />
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default KanbanCardList
