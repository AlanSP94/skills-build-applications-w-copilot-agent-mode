import { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard'

const router = Router()

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().sort({ rank: 1 }).lean()
  res.json({ data: entries, message: 'Leaderboard data' })
})

export default router
