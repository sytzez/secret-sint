export interface InputProps {
  optional?: boolean
  minLength?: number
  name: string
  label: string
  placeholder: string
  type?: string
  autocomplete?: string
  disabled: boolean
  autoFocus?: boolean
}

export default function Input({
  optional,
  minLength,
  name,
  label,
  placeholder,
  type,
  autocomplete,
  disabled,
  autoFocus,
}: InputProps) {
  return (
    <>
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <input
        required={!optional}
        minLength={minLength}
        type={type}
        autoComplete={autocomplete}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className="bg-white rounded-full p-4 disabled:bg-gray-300 shadow-lg mb-2"
      />
    </>
  )
}
