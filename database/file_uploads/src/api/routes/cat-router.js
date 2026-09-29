import express from 'express';
import multer from 'multer';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat
} from '../controllers/cat-controller.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/cats', getCat);

router.get('/cats/:id', getCatById);

router.post('/cats', upload.single('cat'), postCat);

router.put('/cats/:id', putCat);

router.delete('/cats/:id', deleteCat);

export default router;