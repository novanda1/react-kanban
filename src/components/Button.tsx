import classNames from 'classnames'

type ButtonTypes = 'primary' | 'secondary'

type ButtonProps = {
  variant: ButtonTypes
}

type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button: React.FC<
  React.PropsWithChildren & DefaultButtonProps & ButtonProps
> = ({ children, className, variant, ...props }) => {
  const classes: Record<ButtonTypes, string> = {
    primary: 'bg-primary text-white',
    secondary: 'text-neutral-100 border-btn-border bg-white',
  }

  return (
    <button
      className={classNames(
        'leading-6 text-sm',
        'font-bold',
        'py-1 px-4 rounded-lg shadow-btn',
        classes[variant],
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
