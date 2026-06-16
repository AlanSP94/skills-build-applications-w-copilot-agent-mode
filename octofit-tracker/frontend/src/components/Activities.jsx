import { useEffect, useState } from 'react'
import { fetchResource, CODESPACE_NAME } from '../lib/api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true)
      setError(null)
      const endpoint = CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities` : '/api/activities/'

      try {
        const data = await fetchResource(endpoint)
        setActivities(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  const renderActivity = (activity, index) => {
    const record = activity
    const title = String(
      record.name ?? record.activity ?? record.type ?? `Activity ${index + 1}`,
    )

    return (
      <li key={index}>
        <strong>{title}</strong>
        <pre>{JSON.stringify(record, null, 2)}</pre>
      </li>
    )
  }

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && activities.length === 0 && (
        <p>No activities returned from the API.</p>
      )}
      <ul>{activities.map(renderActivity)}</ul>
    </section>
  )
}

export default Activities
