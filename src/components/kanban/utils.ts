export type KanbanType = 'primary' | 'warning' | 'error' | 'success'
export type KanbanElement = 'card' | 'title'

export const kanbanTypeClasses: Record<
  KanbanType,
  Record<KanbanElement, string>
> = {
  primary: {
    card: 'border-primary bg-primary-100',
    title: 'border-primary text-primary',
  },
  warning: {
    card: 'border-warning bg-warning-100',
    title: 'border-warning text-warning-contrast',
  },
  error: {
    card: 'border-error bg-error-100',
    title: 'border-error text-error-contrast',
  },
  success: {
    card: 'border-success bg-success-100',
    title: 'border-success text-success-contrast',
  },
}

export const indexToTypeMap: Record<number, KanbanType> = {
  0: 'primary',
  1: 'warning',
  2: 'error',
  3: 'success',
}
