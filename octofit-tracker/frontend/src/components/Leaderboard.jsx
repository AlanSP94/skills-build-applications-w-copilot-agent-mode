import { useEffect, useState } from 'react'
import { fetchResource, CODESPACE_NAME } from '../lib/api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true)
      setError(null)
      const endpoint = CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard` : '/api/leaderboard/'

      try {
        const data = await fetchResource(endpoint)
        setEntries(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  const renderEntry = (entry, index) => {
    const record = entry
    const label = String(
      record.username ?? record.name ?? `Rank ${index + 1}`,
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
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && entries.length === 0 && (
        <p>No leaderboard entries returned from the API.</p>
      )}
      <ul>{entries.map(renderEntry)}</ul>
    </section>
  )
}

export default Leaderboard
