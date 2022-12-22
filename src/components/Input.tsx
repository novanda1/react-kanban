import classNames from 'classnames'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(
        'text-xs text-neutral-90',
        'border-input-border rounded-lg',
        className,
      )}
      {...props}
    />
  )
}

export default Input
