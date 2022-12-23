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
        'p-1 w-max border text-xs',
        kanbanTypeClasses[type].title,
      )}
    >
      {children}
    </h3>
  )
}

export default TitleBadge
