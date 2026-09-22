import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat
} from '../controllers/cat-controller.js';

const router = express.Router();

router.get('/cats', getCat);
router.get('/cats/:id', getCatById);
router.post('/cats', postCat);
router.put('/cats/:id', putCat);
router.delete('/cats/:id', deleteCat);

export default router;