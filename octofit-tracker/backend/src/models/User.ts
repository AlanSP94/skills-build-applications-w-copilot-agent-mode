import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role: 'user' | 'coach'
  team: string
  joinedAt: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'coach'], default: 'user' },
  team: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
})

export const User = model<IUser>('User', userSchema)
