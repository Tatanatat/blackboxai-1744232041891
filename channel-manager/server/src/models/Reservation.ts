import mongoose, { Schema } from 'mongoose';
import { Room } from './Room';

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export enum Channel {
  DIRECT = 'direct',
  AIRBNB = 'airbnb',
  BOOKING = 'booking',
  WHATSAPP = 'whatsapp'
}

export interface IReservation {
  guestName: string;
  guestContact: string;
  room: typeof Room;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children?: number;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  channel: Channel;
  notes?: string;
  totalAmount: number;
  amountPaid: number;
}

const reservationSchema = new Schema<IReservation>({
  guestName: { type: String, required: true },
  guestContact: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  adults: { type: Number, required: true, min: 1 },
  children: { type: Number, min: 0 },
  status: { 
    type: String, 
    enum: Object.values(ReservationStatus),
    default: ReservationStatus.PENDING
  },
  paymentStatus: { 
    type: String, 
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING
  },
  channel: { 
    type: String, 
    enum: Object.values(Channel),
    required: true 
  },
  notes: String,
  totalAmount: { type: Number, required: true, min: 0 },
  amountPaid: { type: Number, default: 0, min: 0 }
}, {
  timestamps: true
});

export const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);
