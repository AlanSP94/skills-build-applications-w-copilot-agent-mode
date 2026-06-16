import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

function Activities() {
  const [activities, setActivities] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true)
      setError(null)
      const endpoint = '/api/activities/'

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

  const renderActivity = (activity: unknown, index: number) => {
    const record = activity as Record<string, unknown>
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
