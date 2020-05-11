import express from 'express';
import passport from 'passport';

import * as controleurCommerce from '../controllers/controleurCommerce';

const router = express.Router();

router.get('/recuperer', controleurCommerce.recuperer_commerces_get);

export default router;