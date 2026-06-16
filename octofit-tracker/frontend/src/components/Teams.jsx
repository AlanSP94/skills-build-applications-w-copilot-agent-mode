import { useEffect, useState } from 'react'
import { fetchResource, CODESPACE_NAME } from '../lib/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true)
      setError(null)
      const endpoint = CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams` : '/api/teams/'

      try {
        const data = await fetchResource(endpoint)
        setTeams(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  const renderTeam = (team, index) => {
    const record = team
    const label = String(
      record.name ?? record.team ?? `Team ${index + 1}`,
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
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && teams.length === 0 && <p>No teams returned from the API.</p>}
      <ul>{teams.map(renderTeam)}</ul>
    </section>
  )
}

export default Teams
