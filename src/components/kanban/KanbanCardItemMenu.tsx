import * as Menu from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import { FC, useCallback, useState } from 'react'
import type { Item, Todo } from '../../api/api'
import { useItemLocal } from '../../api/useItems'
import IconArrowLeft from '../../icons/IconArrowLeft'
import IconArrowRight from '../../icons/IconArrowRight'
import IconDelete from '../../icons/IconDelete'
import IconEdit from '../../icons/IconEdit'
import IconOptionDots from '../../icons/IconOptionDots'
import TaskModalDelete from '../modal/TaskModalDelete'
import TaskModalWrite from '../modal/TaskModalWrite'

const MenuItem: FC<
  Menu.DropdownMenuItemProps &
    React.RefAttributes<HTMLDivElement> & { isDelete?: boolean }
> = ({ className, isDelete, ...props }) => (
  <Menu.Item
    className={classNames(
      className,
      'cursor-pointer',
      'py-1.5 px-4',
      'grid grid-cols-[24px_auto] items-center gap-4',
      'item-highlighted:outline-none',
      {
        'item-highlighted:text-primary': !isDelete,
        'item-highlighted:text-error-contrast': isDelete,
      },
    )}
    {...props}
  />
)

const KanbanCardItemMenu: FC<{ todo: Todo; item: Item }> = ({ todo, item }) => {
  const [open, setOpen] = useState(false)
  const { moveToLeftTodo, moveToRightTodo } = useItemLocal()

  const onMoveToLeft = () => moveToLeftTodo({ item, sourceId: todo.id })
  const onMoveToRight = () => moveToRightTodo({ item, sourceId: todo.id })

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger>
        <IconOptionDots />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Content
          side="bottom"
          align="start"
          className="py-2 shadow-kanban-menu rounded bg-white w-80"
        >
          <MenuItem onClick={onMoveToRight}>
            <IconArrowRight className="justify-self-center" />
            <p>Move Right</p>
          </MenuItem>
          <MenuItem onClick={onMoveToLeft}>
            <IconArrowLeft className="justify-self-center" />
            <p>Move Left</p>
          </MenuItem>

          <TaskModalWrite
            operation="edit"
            todo={todo}
            itemId={item.id}
            initialForm={{
              name: item.name,
              progress_percentage: item.progress_percentage,
            }}
          >
            <MenuItem onSelect={(e) => e.preventDefault()}>
              <IconEdit className="justify-self-center" />
              <p>Edit</p>
            </MenuItem>
          </TaskModalWrite>

          <TaskModalDelete itemId={item.id} todoId={todo.id}>
            <MenuItem isDelete onClick={(e) => e.preventDefault()}>
              <IconDelete className="justify-self-center" />
              <p>Delete</p>
            </MenuItem>
          </TaskModalDelete>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  )
}

export default KanbanCardItemMenu
