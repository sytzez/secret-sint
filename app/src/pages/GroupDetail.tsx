import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiContext } from '../contexts/api-context'
import ParticipantsList from '../components/ParticipantsList'
import Button from '../components/Button'
import GroupProgress from '../components/GroupProgress'
import useAsync from '../hooks/use-async'
import ErrorText from '../components/ErrorText'
import Layout from '../components/Layout'
import Loading from '../components/Loading'

export default function GroupDetail() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const { groupId } = useParams()

  const {
    go: loadGroup,
    result: group,
    error: loadError,
  } = useAsync(async () => await api.group(Number(groupId)))

  const {
    go: assignSecretSints,
    isLoading: isLoadingSecretSints,
    error: secretSintsError,
  } = useAsync(async () => {
    await api.assignSecretSints(group!.id)
    loadGroup()
  })

  useEffect(loadGroup, [groupId])

  if (loadError) {
    return (
      <Layout
        onHome={() => navigate('/groups')}
        onBack={() => navigate('/groups')}
        onLogOut={api.logOut}
      >
        <ErrorText error={loadError} />
      </Layout>
    )
  }

  if (!group) {
    return (
      <Layout
        onHome={() => navigate('/groups')}
        onBack={() => navigate('/groups')}
        onLogOut={api.logOut}
      >
        <Loading />
      </Layout>
    )
  }

  const canAssignSecretSints =
    group.users &&
    group.users.length >= 3 &&
    group.wishlist_count === group.users.length

  return (
    <Layout
      title={group.title}
      onHome={() => navigate('/groups')}
      onBack={() => navigate('/groups')}
      onLogOut={api.logOut}
    >
      {!group.has_started && (
        <Button
          label="Edit your wishlist"
          onClick={() => navigate(`/groups/${group.id}/wishlist`)}
          style="secondary"
        />
      )}
      {group.has_started && (
        <>
          <Button
            label="View your assignee"
            onClick={() => navigate(`/groups/${group.id}/assignee`)}
            style="secondary"
          />
          <Button
            label="Update your present status"
            onClick={() => navigate(`/groups/${group.id}/present-status`)}
            style="secondary"
          />
        </>
      )}
      <h2 className="text-white text-lg font-bold mt-2">Participants</h2>
      <ParticipantsList
        users={group.users!}
        canAdd={!group.has_started}
        onAdd={() => navigate(`/groups/${group.id}/invite`)}
      />
      <h2 className="text-white text-lg font-bold mt-2">Progress</h2>
      <GroupProgress group={group} />
      {!group.has_started && (
        <>
          <Button
            label={isLoadingSecretSints ? '...' : 'Assign Secret Sints!'}
            onClick={assignSecretSints}
            disabled={!canAssignSecretSints || isLoadingSecretSints}
            style="primary"
          />
          <ErrorText error={secretSintsError} />
          <p className="text-white mb-2">
            Once the Secret Sints have been assigned, you can not invite any
            more participants, nor can anyone change their wishlists.
          </p>
        </>
      )}
      <div className="mt-6">
        <Button
          label="Back to all groups"
          onClick={() => navigate('/groups')}
          style="secondary"
        />
      </div>
    </Layout>
  )
}
