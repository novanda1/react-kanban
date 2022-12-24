import { FC, useState } from 'react'
import * as Menu from '@radix-ui/react-dropdown-menu'
import IconOptionDots from '../../icons/IconOptionDots'
import classNames from 'classnames'
import IconArrowRight from '../../icons/IconArrowRight'
import IconArrowLeft from '../../icons/IconArrowLeft'
import IconEdit from '../../icons/IconEdit'
import IconDelete from '../../icons/IconDelete'

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

const KanbanCardItemMenu: FC = () => {
  const [open, setOpen] = useState(false)

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
          <MenuItem>
            <IconArrowRight className="justify-self-center" />
            <p>Move Right</p>
          </MenuItem>
          <MenuItem>
            <IconArrowLeft className="justify-self-center" />
            <p>Move Left</p>
          </MenuItem>
          <MenuItem>
            <IconEdit className="justify-self-center" />
            <p>Edit</p>
          </MenuItem>
          <MenuItem isDelete>
            <IconDelete className="justify-self-center" />
            <p>Delete</p>
          </MenuItem>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  )
}

export default KanbanCardItemMenu
