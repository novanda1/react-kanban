import classNames from 'classnames'

const Label: React.FC<
  React.PropsWithChildren & React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ children, className, ...props }) => {
  return (
    <label
      className={classNames('font-bold', 'text-neutral-90 text-xs')}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
