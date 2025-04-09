import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Channel Manager API');
});

import roomRoutes from './routes/roomRoutes';
import reservationRoutes from './routes/reservationRoutes';

app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);

export default app;
