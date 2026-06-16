import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true)
      setError(null)
      const endpoint = '/api/workouts/'

      try {
        const data = await fetchResource(endpoint)
        setWorkouts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  const renderWorkout = (workout, index) => {
    const record = workout
    const label = String(
      record.title ?? record.name ?? `Workout ${index + 1}`,
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
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && workouts.length === 0 && (
        <p>No workouts returned from the API.</p>
      )}
      <ul>{workouts.map(renderWorkout)}</ul>
    </section>
  )
}

export default Workouts
