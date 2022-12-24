import classNames from 'classnames'
import { FC } from 'react'
import IconComplete from '../icons/IconComplete'
import IconIncomplete from '../icons/IconIncomplete'

type Variant = 'primary' | 'success' | 'error'

type Props = {
  percentage: number
  variant?: Variant
  className?: string
}

const classes: Record<Variant, string> = {
  primary: 'bg-primary',
  error: 'bg-error-contrast',
  success: 'bg-success-contrast',
}

const Progress: FC<Props> = ({
  percentage,
  variant = 'primary',
  className,
}) => {
  const RenderPercentageOrIcon = () => {
    switch (variant) {
      case 'primary':
        return <>{percentage + '%'}</>

      case 'success':
        return <IconComplete />

      case 'error':
        return <IconIncomplete />
    }
  }

  return (
    <div className={classNames('flex flex-row gap-3 items-center', className)}>
      <div className="w-full bg-neutral-30 rounded-full h-4 overflow-hidden">
        <div
          className={classNames('rounded-l-full h-full', classes[variant])}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-neutral-70 text-xs">
        <RenderPercentageOrIcon />
      </p>
    </div>
  )
}

export default Progress
