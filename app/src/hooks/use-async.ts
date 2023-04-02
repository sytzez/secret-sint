import { useState } from 'react'

export default function useAsync<T, U>(
  call: (param: U) => Promise<T>,
): [(param?: U) => void, T | null, boolean, string] {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<T | null>(null)

  const go = (param?: U) => {
    setLoading(true)

    // @ts-ignore this is ok to be undefined
    call(param)
      .then(setResult)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  return [go, result, isLoading, error]
}
