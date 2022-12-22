import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const Container: FC<PropsWithChildren & Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={classNames('max-w-app mx-auto px-6', className)} {...props}>
      {children}
    </div>
  )
}

export default Container
