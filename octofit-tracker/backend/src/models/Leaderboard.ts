import { Schema, model, Document } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: string
  team: string
  points: number
  rank: number
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: String, required: true },
  team: { type: String, required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
})

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
