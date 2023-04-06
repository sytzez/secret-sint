import ErrorText from './ErrorText'
import { ReactNode } from 'react'
import Button from './Button'

export interface FormProps {
  children: ReactNode
  submitLabel: string
  onSubmit: (data: FormData) => void
  isLoading: boolean
  error: string
}

export default function Form({
  children,
  submitLabel,
  onSubmit,
  isLoading,
  error,
}: FormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (isLoading) return
        onSubmit(new FormData(event.target as HTMLFormElement))
      }}
      className="flex gap-2 flex-col"
    >
      {children}
      <Button
        type="submit"
        style="primary"
        label={isLoading ? '...' : submitLabel}
        disabled={isLoading}
      />
      <ErrorText error={error} />
    </form>
  )
}
