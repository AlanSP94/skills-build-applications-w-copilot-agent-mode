/**
 * Seed the octofit_db database with test data
 */

import mongoose from 'mongoose'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Leaderboard } from '../models/Leaderboard'
import { Workout } from '../models/Workout'

const seed = async () => {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

  await mongoose.connect(connectionString)
  console.log(`Connected to octofit_db at ${connectionString}`)

  console.log('Seed the octofit_db database with test data')

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const teams = await Team.create([
    { name: 'Sunrise Sprinters', description: 'Morning runners with a passion for pace', members: 8 },
    { name: 'Midnight Movers', description: 'Evening workout crew focused on strength', members: 6 },
  ])

  const users = await User.create([
    { name: 'Alex Carter', email: 'alex.carter@example.com', role: 'user', team: teams[0].name, joinedAt: new Date('2026-05-01') },
    { name: 'Jordan Kim', email: 'jordan.kim@example.com', role: 'coach', team: teams[1].name, joinedAt: new Date('2026-02-14') },
    { name: 'Priya Singh', email: 'priya.singh@example.com', role: 'user', team: teams[0].name, joinedAt: new Date('2026-04-22') },
  ])

  const activities = await Activity.create([
    { user: users[0].name, type: 'Running', durationMinutes: 42, calories: 480, date: new Date('2026-06-10T07:15:00Z') },
    { user: users[1].name, type: 'Yoga', durationMinutes: 60, calories: 230, date: new Date('2026-06-11T18:30:00Z') },
    { user: users[2].name, type: 'Cycling', durationMinutes: 55, calories: 510, date: new Date('2026-06-12T06:45:00Z') },
  ])

  await Leaderboard.create([
    { user: users[0].name, team: teams[0].name, points: 1200, rank: 1 },
    { user: users[2].name, team: teams[0].name, points: 990, rank: 2 },
    { user: users[1].name, team: teams[1].name, points: 780, rank: 3 },
  ])

  await Workout.create([
    { title: 'Cardio Blast', focus: 'Endurance', durationMinutes: 30, difficulty: 'Intermediate' },
    { title: 'Core Strength Builder', focus: 'Strength', durationMinutes: 45, difficulty: 'Advanced' },
    { title: 'Recovery Flow', focus: 'Flexibility', durationMinutes: 25, difficulty: 'Beginner' },
  ])

  console.log('Insert complete for users, teams, activities, leaderboard, and workouts')

  // Verify data creation by counting inserted documents
  const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments(),
    Workout.countDocuments(),
  ])

  console.log(`Created ${userCount} users, ${teamCount} teams, ${activityCount} activities, ${leaderboardCount} leaderboard entries, and ${workoutCount} workouts.`)

  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})
