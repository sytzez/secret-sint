import { useState } from 'react'

export default function useAsync<T>(
  call: () => Promise<T>,
): [() => void, T | null, boolean, string] {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<T | null>(null)

  const go = () => {
    setLoading(true)

    call()
      .then(setResult)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  return [go, result, isLoading, error]
}
