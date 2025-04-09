import { Request, Response } from 'express-serve-static-core';
import { Reservation, ReservationStatus, PaymentStatus, Channel } from '../models/Reservation';
import { Room } from '../models/Room';

// Helper to check room availability
async function isRoomAvailable(roomId: string, checkIn: Date, checkOut: Date): Promise<boolean> {
  const conflictingReservations = await Reservation.find({
    room: roomId,
    status: { $ne: ReservationStatus.CANCELLED },
    $or: [
      { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
    ]
  });
  return conflictingReservations.length === 0;
}

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { room: roomId, checkIn, checkOut } = req.body;
    
    // Validate room availability
    if (!await isRoomAvailable(roomId, new Date(checkIn), new Date(checkOut))) {
      return res.status(400).json({ error: 'Room not available for selected dates' });
    }

    // Validate room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const { status, paymentStatus, channel, room } = req.query;
    const filter: any = {};
    
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (channel) filter.channel = channel;
    if (room) filter.room = room;

    const reservations = await Reservation.find(filter).populate('room');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { paymentStatus, amountPaid } = req.body;
    const updateData: any = { paymentStatus };
    if (amountPaid !== undefined) updateData.amountPaid = amountPaid;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('room');
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
