import { Schema, model, Document } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description: string
  members: number
  createdAt: Date
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Team = model<ITeam>('Team', teamSchema)
