import { Group } from '../schemata/group'
import ProgressBar from './ProgressBar'

export interface GroupProgressProps {
  group: Group
}

export default function GroupProgress({ group }: GroupProgressProps) {
  if (group.has_started) {
    return <></>
  }

  return (
    <>
      {group.users!.length < 3 && (
        <div className="mb-2">
          <p className="text-white mb-1">
            You need a least 3 participants to play Secret Sint.
          </p>
          <ProgressBar progress={group.users!.length / 3} />
        </div>
      )}
      {group.users!.length > 1 && (
        <div className="mb-2">
          <p className="text-white mb-1">
            {group.wishlist_count!} out of {group.users!.length} people have
            written their wishlist.
          </p>
          <ProgressBar progress={group.wishlist_count! / group.users!.length} />
        </div>
      )}
    </>
  )
}
