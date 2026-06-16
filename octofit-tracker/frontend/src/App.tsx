import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>
          This app loads data from the backend using{' '}
          <code>VITE_CODESPACE_NAME</code> or a localhost fallback.
        </p>
      </header>

      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/activities">Activities</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/workouts">Workouts</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome</h2>
                <p>
                  Use the navigation above to explore the OctoFit Tracker data
                  pages.
                </p>
                <p>
                  The backend URL is built from{' '}
                  <code>import.meta.env.VITE_CODESPACE_NAME</code>. If it is
                  unset, the app will fall back to{' '}
                  <code>http://localhost:8000/api</code>.
                </p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
