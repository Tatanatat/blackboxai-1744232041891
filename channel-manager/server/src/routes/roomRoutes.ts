import express from 'express';
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} from '../controllers/roomController';

const router = express.Router();

router.post('/', createRoom as express.RequestHandler);
router.get('/', getRooms as express.RequestHandler);
router.get('/:id', getRoomById as express.RequestHandler);
router.put('/:id', updateRoom as express.RequestHandler);
router.delete('/:id', deleteRoom as express.RequestHandler);

export default router;
