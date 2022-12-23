import {
  Content,
  DialogProps,
  Overlay,
  Portal,
  Root,
} from '@radix-ui/react-dialog'
import { FC } from 'react'

type Props = {} & DialogProps

const TaskModal: FC<Props> = ({ children, ...dialogProps }) => {
  return (
    <Root {...dialogProps}>
      <Portal>
        <Overlay />
        <Content>{children}</Content>
      </Portal>
    </Root>
  )
}

export default TaskModal
