import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import { KanbanType, kanbanTypeClasses } from './utils'

const TitleBadge: FC<PropsWithChildren & { variant: KanbanType }> = ({
  children,
  variant: type,
}) => {
  return (
    <h3
      className={classNames(
        'py-0.5 px-2 w-max border text-xs leading-5 rounded',
        kanbanTypeClasses[type].title,
      )}
    >
      {children}
    </h3>
  )
}

export default TitleBadge
