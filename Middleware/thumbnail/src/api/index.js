import express from 'express';
import catRouter from './routes/cat-router.js';

const router = express.Router();

router.use(catRouter);

export default router;