import { useContext } from 'react'
import { ApiContext } from '../contexts/api-context'

export default function Groups() {
  const api = useContext(ApiContext)

  api.groups().then(console.log)

  return <p>Groups</p>
}
