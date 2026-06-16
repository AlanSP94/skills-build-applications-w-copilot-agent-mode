import { Router } from 'express'
import { Workout } from '../models/Workout'

const router = Router()

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean()
  res.json({ data: workouts, message: 'List of workouts' })
})

export default router
