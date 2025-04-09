import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
  updatePaymentStatus
} from '../controllers/reservationController';

const router = express.Router();

router.post('/', createReservation as express.RequestHandler);
router.get('/', getReservations as express.RequestHandler);
router.get('/:id', getReservationById as express.RequestHandler);
router.patch('/:id/status', updateReservationStatus as express.RequestHandler);
router.patch('/:id/payment', updatePaymentStatus as express.RequestHandler);

export default router;
