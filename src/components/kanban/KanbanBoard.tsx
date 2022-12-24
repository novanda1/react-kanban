import { FC, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { useItemLocal, useItems } from '../../api/useItems'
import useTodos from '../../api/useTodos'
import KanbanColumn from './KanbanColumn'

const KanbanBoard: FC = () => {
  const { todos } = useTodos()
  const { updateItem, mapTodoToItems } = useItemLocal()

  const onDragEnd: OnDragEndResponder = async (result, provided) => {
    const { destination, source, draggableId } = result

    const itemId = +draggableId
    const prevTodoId = +source.droppableId.split('todoid-')[1]
    const nextTodoId = destination?.droppableId.split('todoid-').length
      ? destination?.droppableId.split('todoid-')[1]
      : null

    if (!nextTodoId || typeof destination?.index === 'undefined') return

    updateItem({
      source: { index: source.index, todoId: prevTodoId },
      destination: { index: destination?.index, todoId: +nextTodoId },
      itemId,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="column">
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            ref={innerRef}
            {...droppableProps}
            className="inline-flex w-full gap-4 overflow-x-auto h-screen"
          >
            {!todos?.length && 'Loading todos...'}

            {todos?.map((todo, index) => (
              <div key={todo.id} className="flex flex-col w-full min-w-[300px]">
                <KanbanColumn index={index} todo={todo} />
                {placeholder}
              </div>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default KanbanBoard
