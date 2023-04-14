import { useState } from 'react'

export default function useAsync<T, U>(call: (param: U) => Promise<T>) {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<T | null>(null)

  const go = (param?: U) => {
    setLoading(true)
    setError('')

    let isCurrent = true

    // @ts-ignore it's ok for this to be undefined
    call(param)
      .then((callResult) => {
        if (isCurrent) setResult(callResult)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))

    return () => {
      isCurrent = false
    }
  }

  return { go, result, isLoading, error }
}
