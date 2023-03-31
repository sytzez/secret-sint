## Data model

- User
  - groups: hasManyThrough groupUser
- GroupUser
  - user: belongsTo
  - group: belongsTo
  - wishlist: string (nullable)
  - assignedUser: belongsTo user (nullable)
  - presentStatus (nullable)
  - eta: date (nullable)
- Group
  - users: hasManyThrough groupUser
  - title: string
  - has_started: bool (Once group has started, new users can't be added)
  - deadline: date

# Features
- Create groups
- Join groups
- Add your own wishlist for a group
- See how many users have set their wishlist.
- If everyone has set their wishlist, someone can start the group. This will assign each user to another user randomly.
- When a group has started -> Can see the user assigned to you and their wishlist
- When a group has started -> Can update the status of getting a present. (Not started, ordered, arrived), and the ETA of arrival
- When a group has started, you can see how many users have ordered the present, how many have arrived, and the ETA's
