import classNames from 'classnames'
import { FC, PropsWithChildren, useState } from 'react'
import { useItemLocal } from '../../api/useItems'
import IconAlert from '../../icons/IconAlert'
import IconClose from '../../icons/IconClose'
import Button from '../Button'
import TaskModal from './TaskModal'

type Props = {
  todoId: number
  itemId: number
}

const TaskModalDelete: FC<PropsWithChildren & Props> = ({
  children,
  itemId,
  todoId,
}) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  const { removeItemInTodoId } = useItemLocal()

  const handleDelete = () => {
    removeItemInTodoId(todoId, itemId)
  }

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>
      <TaskModal open={open} onOpenChange={setOpen}>
        <div className="flex flex-row">
          <h3
            className={classNames(
              'text-lg font-bold text-neutral-100 flex-1 capitalize',
              'flex flex-row gap-2 items-center',
            )}
          >
            <IconAlert />
            Delete Task
          </h3>
          <button onClick={toggleOpen}>
            <IconClose />
          </button>
        </div>

        <p className="text-neutral-90 text-sm leading-6 mt-4">
          Are you sure want to delete this task? your action can’t be reverted.
        </p>

        <div className="flex flex-row justify-end mt-6 w-full gap-2.5">
          <Button variant="secondary" onClick={toggleOpen}>
            Cancel
          </Button>
          <Button variant="error" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </TaskModal>
    </>
  )
}

export default TaskModalDelete
