import { Router } from 'express'
import { Team } from '../models/Team'

const router = Router()

router.get('/', async (_req, res) => {
  const teams = await Team.find().lean()
  res.json({ data: teams, message: 'List of teams' })
})

export default router
