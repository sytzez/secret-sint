import { describe, expect, it } from 'vitest'
import createApi from './create-api'
import { expectFetchCall, mockFetch } from '../spec-helpers'

describe('createApi', () => {
  const api = createApi({
    baseUrl: 'example.com',
    onAuthError: () => {
      /* do nothing */
    },
  })

  it('sends signup requests', async () => {
    mockFetch({ success: true })
    const request = { email: 'a', password: 'b', password_confirmation: 'c' }
    await api.signUp(request)
    expectFetchCall('POST', 'example.com/signup', { user: request })
  })

  it('sends login requests', async () => {
    mockFetch({ success: true })
    const request = { email: 'a', password: 'b' }
    await api.logIn(request)
    expectFetchCall('POST', 'example.com/login', { user: request })
  })

  it('sends logout requests', async () => {
    mockFetch({ success: true })
    await api.logOut()
    expectFetchCall('DELETE', 'example.com/logout')
  })

  it('sends groups requests', async () => {
    const group = { id: 1, title: 'A group ', has_started: false }
    mockFetch({ success: true, data: [group] })
    expect(await api.groups()).toEqual([group])
    expectFetchCall('GET', 'example.com/groups')
  })

  it('sends group requests', async () => {
    const group = { id: 1, title: 'A group ', has_started: false }
    mockFetch({ success: true, data: group })
    expect(await api.group(123)).toEqual(group)
    expectFetchCall('GET', 'example.com/groups/123')
  })

  it('sends create group requests', async () => {
    const request = { title: 'A group' }
    const group = { id: 1, title: 'A group', has_started: false }
    mockFetch({ success: true, data: group })
    expect(await api.createGroup(request)).toEqual(group)
    expectFetchCall('POST', 'example.com/groups', { group: request })
  })

  it('sends update group requests', async () => {
    const request = { title: 'A group' }
    mockFetch({ success: true })
    await api.updateGroup(123, request)
    expectFetchCall('PATCH', 'example.com/groups/123', { group: request })
  })

  it('sends assign sints requests', async () => {
    mockFetch({ success: true })
    await api.assignSecretSints(123)
    expectFetchCall('POST', 'example.com/groups/123/assign_secret_sints')
  })

  it('sends leave group', async () => {
    mockFetch({ success: true })
    await api.leaveGroup(123)
    expectFetchCall('DELETE', 'example.com/groups/123/participations/own')
  })

  it('sends invite requests', async () => {
    mockFetch({ success: true })
    await api.invite(123, { email: 'a' })
    expectFetchCall('POST', 'example.com/groups/123/participations', {
      participation: { email: 'a' },
    })
  })

  it('sends participation requests', async () => {
    const participation = {
      user: { email: 'bob@email.com' },
      present_status: 'ordered',
    }
    mockFetch({ success: true, data: participation })
    expect(await api.participation(123)).toEqual(participation)
    expectFetchCall('GET', 'example.com/groups/123/participations/own')
  })

  it('sends update participation requests', async () => {
    const request = {
      present_status: 'ordered' as const,
    }
    mockFetch({ success: true })
    await api.updateParticipation(123, request)
    expectFetchCall('PATCH', 'example.com/groups/123/participations/own', {
      participation: request,
    })
  })

  it('sends assignee requests', async () => {
    const participation = {
      user: { email: 'bob@email.com' },
      present_status: 'ordered' as const,
      wishlist: 'stuff',
    }
    mockFetch({ success: true, data: participation })
    expect(await api.assignee(123)).toEqual(participation)
    expectFetchCall('GET', 'example.com/groups/123/participations/assigned')
  })
})
