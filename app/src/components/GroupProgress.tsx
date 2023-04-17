import { Group } from '../schemata/group'
import ProgressBar from './ProgressBar'

export interface GroupProgressProps {
  group: Group
}

export default function GroupProgress({ group }: GroupProgressProps) {
  const userCount = group.users!.length

  if (group.has_started) {
    return (
      <>
        <ProgressBar
          label={`${group.ordered_count!} out of ${userCount} Sints have ordered their presents.`}
          progress={group.ordered_count! / userCount}
        />
        {group.ordered_count! > 0 && ( // We only want to show this stat if at least one person has ordered.
          <ProgressBar
            label={`${group.delivered_count!} out of ${userCount} presents have arrived.`}
            progress={group.delivered_count! / userCount}
          />
        )}
      </>
    )
  }

  return (
    <>
      {userCount < 3 && (
        <ProgressBar
          label="You need a least 3 participants to play Secret Sint."
          progress={group.users!.length / 3}
        />
      )}
      {userCount > 1 && (
        <ProgressBar
          label={`${group.wishlist_count!} out of ${userCount} people have written their wishlist.`}
          progress={group.wishlist_count! / userCount}
        />
      )}
    </>
  )
}
