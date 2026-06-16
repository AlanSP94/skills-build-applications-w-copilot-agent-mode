import { useEffect, useState } from 'react'
import { fetchResource, CODESPACE_NAME } from '../lib/api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError(null)
      const endpoint = CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/users` : '/api/users/'

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

  const renderUser = (user, index) => {
    const record = user
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
