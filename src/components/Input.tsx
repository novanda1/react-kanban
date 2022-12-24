import classNames from 'classnames'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(
        'text-xs text-neutral-90',
        'border-2 border-input-border rounded-lg',
        'py-2 px-4',
        className,
      )}
      {...props}
    />
  )
}

export default Input
