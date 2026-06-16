/**
 * Seed the octofit_db database with test data
 */

import mongoose from 'mongoose'

const seed = async () => {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

  await mongoose.connect(connectionString)
  console.log(`Connected to octofit_db at ${connectionString}`)

  // TODO: Add models and seed data for users, teams, activities, leaderboard, and workouts.

  console.log('Seeded the octofit_db database with test data')
  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})
