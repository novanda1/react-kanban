import {
  Content,
  DialogProps,
  Overlay,
  Portal,
  Root,
} from '@radix-ui/react-dialog'
import classNames from 'classnames'
import { FC } from 'react'

type Props = {} & DialogProps

const TaskModal: FC<Props> = ({ children, ...dialogProps }) => {
  return (
    <Root {...dialogProps}>
      <Portal>
        <Overlay className="fixed inset-0 bg-neutral-100 bg-opacity-60" />
        <Content
          className={classNames(
            'shadow-modal',
            'fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'bg-white w-[432px]',
            'p-6 rounded-[10px]',
          )}
        >
          {children}
        </Content>
      </Portal>
    </Root>
  )
}

export default TaskModal
