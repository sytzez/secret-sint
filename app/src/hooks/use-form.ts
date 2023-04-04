import { z } from 'zod'
import { useState } from 'react'

export default function useForm<T>(
  schema: z.ZodSchema<T>,
  keys: string[],
  onSubmit: (result: T) => void,
): [(data: FormData) => void, string] {
  const [error, setError] = useState('')

  const submit = (data: FormData) => {
    setError('')

    const values: { [key: string]: any } = {}
    keys.forEach((key) => (values[key] = data.get(key)))

    const result = schema.safeParse(values)

    if (result.success) {
      onSubmit(result.data)
    } else {
      console.error(data, values, result.error)

      const flatError = result.error.flatten()
      const messages = [
        ...flatError.formErrors,
        ...Object.values(flatError.fieldErrors).flat(),
      ]

      setError(messages.join('. '))
    }
  }

  return [submit, error]
}
