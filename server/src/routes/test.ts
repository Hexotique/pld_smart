import express from 'express';
import * as controleurTest from '../controllers/controleurTest';

const router = express.Router();

router.put('/init', controleurTest.init);


export default router;