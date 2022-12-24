import { Children, FC, PropsWithChildren, useState } from 'react'
import { Todo, UpdateItemValue } from '../../api/api'
import { useItemLocal, useItems } from '../../api/useItems'
import IconAddCircle from '../../icons/IconAddCircle'
import Button from '../Button'
import Input from '../Input'
import Label from '../Label'
import TaskModal from './TaskModal'

type Operation = 'create' | 'edit'

type Props = {
  todo: Todo
  operation: Operation
  itemId?: number
  initialForm?: UpdateItemValue
}

const TaskModalWrite: FC<Props & PropsWithChildren> = ({
  todo,
  itemId,
  operation,
  children,
  initialForm,
}) => {
  const { createItem } = useItems(todo.id)
  const { editItem } = useItemLocal()

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<{
    name: string
    progress_percentage: string
  }>({
    name: initialForm?.name || '',
    progress_percentage: initialForm?.progress_percentage
      ? initialForm?.progress_percentage + '%'
      : '',
  })

  const toggleOpen = () => setOpen(!open)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.progress_percentage) {
      alert('Fill the form')
      return
    }

    const percentage = +form.progress_percentage.split('%')[0]
    if (Number.isNaN(percentage) || percentage > 100 || percentage < 0) {
      alert('Percentage invalid')
      return
    }

    try {
      switch (operation) {
        case 'create':
          await createItem(todo.id, {
            name: form.name,
            progress_percentage: percentage,
          })
          break

        case 'edit':
          if (!itemId) return
          editItem(
            { todoId: todo.id, itemId },
            {
              name: form.name,
              progress_percentage: percentage,
            },
          )
          break

        default:
          break
      }

      setForm({ name: '', progress_percentage: '' })
      setOpen(false)
    } catch (error) {
      // Handle error here.
    }
  }

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>
      <TaskModal open={open} onOpenChange={setOpen}>
        <div className="flex flex-row">
          <h3 className="text-lg font-bold text-neutral-100 flex-1 capitalize">
            {operation} Task
          </h3>
          <button>closeicon</button>
        </div>

        <div className="mt-6">
          <div className="flex flex-col">
            <Label>Task Name</Label>
            <Input
              type="text"
              name="name"
              className="mt-2"
              placeholder="Type your Task"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex flex-col">
            <Label>Progress</Label>
            <Input
              type="text"
              className="mt-2"
              placeholder="70%"
              name="progress_percentage"
              value={form.progress_percentage || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-row justify-end mt-6 w-full gap-2.5">
          <Button variant="secondary" onClick={toggleOpen}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Task
          </Button>
        </div>
      </TaskModal>
    </>
  )
}

export default TaskModalWrite
