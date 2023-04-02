const styles = {
  primary:
    'w-full rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg disabled:bg-gray-400 mb-2',
  secondary:
    'w-full rounded-full border border-red-300 text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mb-2',
}

export interface ButtonProps {
  label: string
  onClick: () => void
  style: keyof typeof styles
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  label,
  onClick,
  style,
  disabled,
  type,
}: ButtonProps) {
  return (
    <button
      className={styles[style]}
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
    >
      {label}
    </button>
  )
}
