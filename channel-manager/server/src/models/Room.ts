import mongoose, { Schema } from 'mongoose';

export interface IRoom {
  name: string;
  type: string;
  capacity: number;
  basePrice: number;
  highSeasonPrice?: number;
  lowSeasonPrice?: number;
  description?: string;
  amenities?: string[];
  isActive: boolean;
}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  basePrice: { type: Number, required: true, min: 0 },
  highSeasonPrice: { type: Number, min: 0 },
  lowSeasonPrice: { type: Number, min: 0 },
  description: String,
  amenities: [String],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const Room = mongoose.model<IRoom>('Room', roomSchema);
