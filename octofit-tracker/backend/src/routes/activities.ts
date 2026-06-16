import { Router } from 'express'
import { Activity } from '../models/Activity'

const router = Router()

router.get('/', async (_req, res) => {
  const activities = await Activity.find().lean()
  res.json({ data: activities, message: 'List of activities' })
})

export default router
