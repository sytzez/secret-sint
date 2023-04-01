import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../contexts/api-context";
import WishlistForm from "../components/WishlistForm";
import { Participation } from "../schemata/participation";
import { ParticipationRequest } from "../schemata/participation-request";

export default function YourWishlist() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const { groupId } = useParams()
  const [participation, setParticipation] = useState<Participation>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .participation(Number(groupId))
      .then(setParticipation)
      .catch((e: { message: string }) => {
        setError(e.message)
      })
  }, [groupId])

  const onSubmit = async (request: ParticipationRequest) => {
    setLoading(true)
    try {
      await api.updateParticipation(Number(groupId), request)
      navigate('./..')
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  if (!participation && error) return <p className="text-white">{error}</p>

  if (!participation) return <p className="text-white">Loading</p>

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-2">Your wishlist</h1>
      <p className="text-white mb-2">Your wishlist will only be visible to your Secret Sint.</p>
      <WishlistForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        value={participation.wishlist || ''}
      />
      {error && <p className="my-4 text-white">{error}</p>}
      <button
        className="rounded-full border border-white text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mt-4"
        onClick={() => navigate(`/groups/${groupId}`)}
      >
        Back to group
      </button>
    </div>
  )
}
