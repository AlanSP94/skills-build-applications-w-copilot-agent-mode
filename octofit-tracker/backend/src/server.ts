import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const PORT = Number(process.env.PORT) || 8000
const HOST = process.env.CODESPACE_NAME ? '0.0.0.0' : 'localhost'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'
const API_BASE_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api`
  : `http://localhost:${PORT}/api`

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend running', apiBaseUrl: API_BASE_URL })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL, port: PORT })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`)
    app.listen(PORT, HOST, () => {
      console.log(`Backend listening on http://${HOST}:${PORT}`)
      if (process.env.CODESPACE_NAME) {
        console.log(`Codespaces API base URL: ${API_BASE_URL}`)
      }
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
