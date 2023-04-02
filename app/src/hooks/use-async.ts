import { useState } from 'react'

export default function useAsync<T, U>(
  call: (param: U) => Promise<T>,
): [() => void, T | null, boolean, string] {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<T | null>(null)

  const go = (param: U) => {
    setLoading(true)

    call(param)
      .then(setResult)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  return [go, result, isLoading, error]
}
