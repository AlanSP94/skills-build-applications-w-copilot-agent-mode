import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  focus: string
  durationMinutes: number
  difficulty: string
  createdAt: Date
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Workout = model<IWorkout>('Workout', workoutSchema)
