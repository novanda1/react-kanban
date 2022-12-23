import { FC } from 'react'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { useItems } from '../../api/useItems'
import useTodos from '../../api/useTodos'
import KanbanColumn from './KanbanColumn'

const KanbanBoard: FC = () => {
  const { todos } = useTodos()
  const { updateItem } = useItems()

  const onDragEnd: OnDragEndResponder = async (result, provided) => {
    const { destination, source, draggableId } = result

    const itemId = +draggableId
    const prevTodoId = +source.droppableId.split('todoid-')[1]
    const nextTodoId = destination?.droppableId.split('todoid-').length
      ? destination?.droppableId.split('todoid-')[1]
      : null

    if (!nextTodoId) return

    await updateItem(prevTodoId, itemId, { target_todo_id: +nextTodoId })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="column">
        {({ droppableProps, innerRef, placeholder }) => (
          <div>
            <div
              ref={innerRef}
              {...droppableProps}
              className="inline-flex w-full gap-5"
            >
              {!todos?.length && 'Loading todos...'}

              {todos?.map((todo, index) => (
                <>
                  <KanbanColumn key={todo.id} index={index} todo={todo} />
                  {placeholder}
                </>
              ))}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default KanbanBoard
