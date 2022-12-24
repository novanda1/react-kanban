import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Todo } from '../../api/api'
import { useItemLocal, useItems } from '../../api/useItems'
import KanbanCardItem from './KanbanCardItem'
import KanbanCardListEmpty from './KanbanCardListEmpty'
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
  const { isLoading } = useItems(todo.id)
  const { getByTodoId } = useItemLocal()

  return (
    <Droppable droppableId={'todoid-' + todo.id} type={listType}>
      {(dropProvided) => (
        <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
          {isLoading && 'Loading items...'}

          <div className="mt-2">
            <div className="inline-flex flex-col w-full">
              {getByTodoId(todo.id)?.items.length ? (
                getByTodoId(todo.id)?.items?.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(dragProvided) => (
                      <>
                        <KanbanCardItem
                          provided={dragProvided}
                          item={item}
                          todo={todo}
                        />
                      </>
                    )}
                  </Draggable>
                ))
              ) : (
                <KanbanCardListEmpty />
              )}
              {dropProvided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default KanbanCardList
