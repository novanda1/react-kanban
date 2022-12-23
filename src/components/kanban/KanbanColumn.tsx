import classNames from 'classnames'
import { FC, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Todo } from '../../api/api'
import { useItems } from '../../api/useItems'
import IconAddCircle from '../../icons/IconAddCircle'
import Button from '../Button'
import Input from '../Input'
import Label from '../Label'
import TaskModal from '../modal/TaskModal'
import KanbanCardList from './KanbanCardList'
import TitleBadge from './TitleBadge'
import { indexToTypeMap, kanbanTypeClasses } from './utils'

type Props = {
  index: number
  todo: Todo
}

const KanbanColumn: FC<Props> = ({ index, todo }) => {
  const type = indexToTypeMap[index]
  const { createItem } = useItems(todo.id)

  const [open, setOpen] = useState(false)
  const [createTaskForm, setCreateTaskForm] = useState<{
    name: string
    progress_percentage: string
  }>({
    name: '',
    progress_percentage: '',
  })

  const toggleOpen = () => setOpen(!open)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTaskForm({ ...createTaskForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!createTaskForm.name || !createTaskForm.progress_percentage) {
      alert('Fill the form')
      return
    }

    const percentage = +createTaskForm.progress_percentage.split('%')[0]
    if (Number.isNaN(percentage) || percentage > 100 || percentage < 0) {
      alert('Percentage invalid')
      return
    }

    try {
      await createItem(todo.id, {
        name: createTaskForm.name,
        progress_percentage: percentage,
      })

      setCreateTaskForm({ name: '', progress_percentage: '' })
      setOpen(false)
    } catch (error) {
      // Handle error here.
    }
  }

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
              'p-4 border w-full h-max',
              kanbanTypeClasses[type].card,
              'transtition-all duration-300 ease',
            )}
          >
            <TitleBadge {...provided.dragHandleProps} variant={type}>
              {todo.title}
            </TitleBadge>
            <p className="text-xs mt-2">{todo.description}</p>

            <KanbanCardList todo={todo} listType="ITEM" type={type} />

            <button
              onClick={toggleOpen}
              className="flex gap-1 items-center mt-3 text-xs"
            >
              <IconAddCircle />
              New Task
            </button>

            <TaskModal open={open} onOpenChange={setOpen}>
              <h3>Create Task</h3>

              <div>
                <div className="flex flex-col">
                  <Label>Task Name</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Type your Task"
                    value={createTaskForm.name}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  type="text"
                  placeholder="70%"
                  name="progress_percentage"
                  value={createTaskForm.progress_percentage || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Button variant="secondary" onClick={toggleOpen}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Task
                </Button>
              </div>
            </TaskModal>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default KanbanColumn
