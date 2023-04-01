import { useContext, useEffect, useState } from 'react'
import { Group } from '../schemata/group'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../contexts/api-context'

export default function GroupDetail() {
  const [group, setGroup] = useState<Group | null>(null)
  const [error, setError] = useState('')
  const { groupId } = useParams()
  const api = useContext(ApiContext)

  useEffect(() => {
    api
      .group(parseInt(groupId))
      .then(setGroup)
      .catch((e: { message: string }) => {
        setError(e.message)
      })
  }, [groupId])

  if (error) return <p>{error}</p>

  if (!group) {
    return <p>Loading</p>
  }

  return (
    <>
      <h1 className="text-white text-2xl font-bold mb-4">{group.title}</h1>
      <p>TODO: list of name</p>
    </>
  )
}
