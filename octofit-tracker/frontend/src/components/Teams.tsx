import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

function Teams() {
  const [teams, setTeams] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchResource('teams')
        setTeams(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  const renderTeam = (team: unknown, index: number) => {
    const record = team as Record<string, unknown>
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
