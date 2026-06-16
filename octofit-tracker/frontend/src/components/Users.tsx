import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

function Users() {
  const [users, setUsers] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError(null)
      const endpoint = '/api/users/'

      try {
        const data = await fetchResource(endpoint)
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const renderUser = (user: unknown, index: number) => {
    const record = user as Record<string, unknown>
    const label = String(
      record.username ?? record.name ?? `User ${index + 1}`,
    )

    return (
      <li key={index}>
        <strong>{label}</strong>
        <pre>{JSON.stringify(record, null, 2)}</pre>
      </li>
    )
  }

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users returned from the API.</p>}
      <ul>{users.map(renderUser)}</ul>
    </section>
  )
}

export default Users
