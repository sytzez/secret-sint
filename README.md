## Technologies used

`Ruby on Rails` `React` `React Router` `Zod` `Vite` `Vitest` `React testing library`

## Domain model

## Code examples - Groups

These are the source files involved with displaying and mutating "groups" (DSL),
showing the processes and technologies used across the whole stack.

- Server-side `Ruby` `Rails`
  - Database migration `ActiveRecord` - [20230331183825_create_groups.rb](api/db/migrate/20230331183825_create_groups.rb)
  - Object relational model `ActiveRecord` - [group.rb](api/app/models/group.rb)
  - Controller `ActiveController` - [groups_controller.rb](api/app/controllers/groups_controller.rb)
  - Base controller `ActiveController` - [application_controller.rb](api/app/controllers/application_controller.rb)
- Client-side `TypeScript` `Vite`
  - REST API client - 
    *Provides a simple interface to make API requests, provided to React components through a React Context.*
    - API fetcher `Fetch` - [api-fetcher.ts](app/src/api/api-fetcher.ts)
    - API object - [create-api.ts](app/src/api/create-api.ts)
    - API context provider `React Context` - [api-context.tsx](app/src/contexts/api-context.tsx)
  - Validation schemata `Zod` -
    *Provides validation and processing of data coming from the API as well as data submitted into forms.*
    - Response schema -  [group.ts](app/src/schemata/group.ts)
    - Response schema spec `Vitest` - [group.spec.ts](app/src/schemata/group.spec.ts)
    - Request schema - [group-request.ts](app/src/schemata/group-request.ts)
    - Request schema spec `Vitest` - [group-request.spec.ts](app/src/schemata/group-request.spec.ts)
  - Hooks `React Hooks` - *These custom hooks abstract out state management patterns for various components.*
    - Async hook - [use-async.ts](app/src/hooks/use-async.ts)
    - Form hook - [use-form.ts](app/src/hooks/use-form.ts)
    - Route parameter hook `React Router` - [use-group-id.ts](app/src/hooks/use-group-id.ts)
  - UI components `React` `JSX` `TailwindCSS` -
    *"Dumb" components dealing only with rendering data and dealing with DOM events.*
    - Generic form component - [Form.tsx](app/src/components/Form.tsx)
    - Generic form component spec `React testing library` - [Form.spec.tsx](app/src/components/Form.tsx)
    - Form component - [GroupForm.tsx](app/src/components/GroupForm.tsx)
    - Form component spec `React testing library` - [GroupForm.spec.tsx](app/src/components/GroupForm.spec.tsx)
    - Elemental components - [Button.tsx](app/src/components/Button.tsx),
      [Input.tsx](app/src/components/Input.tsx),
      [ErrorText.tsx](app/src/components/ErrorText.tsx)
    - Elemental component specs `React testing library` - [Button.spec.tsx](app/src/components/Button.spec.tsx),
      [Input.spec.tsx](app/src/components/Input.spec.tsx),
      [ErrorText.spec.tsx](app/src/components/ErrorText.spec.tsx)
  - Pages `React` `JSX` `TailwindCSS` -
    *Pages manage application state, fire and read API requests, and pass the state onto UI components.*
    - Details page - [GroupDetail.tsx](app/src/pages/GroupDetail.tsx)
    - Create page - [NewGroup.tsx](app/src/pages/NewGroup.tsx)
    - Index page - [Groups.tsx](app/src/pages/Groups.tsx)
  - App element with routing `React` `JSX` `React Router` - [App.tsx](app/src/App.tsx)
  - Front-end entry file `React` `Vite ENV` -  [main.tsx](app/src/main.tsx)


## Data model

- User
  - groups: hasManyThrough participations
- Participation
  - user: belongsTo
  - group: belongsTo
  - wishlist: string (nullable)
  - assignedUser: belongsTo user (nullable)
  - presentStatus (nullable)
  - eta: date (nullable)
- Group
  - users: hasManyThrough participations
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
