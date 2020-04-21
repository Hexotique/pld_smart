import express from 'express';
import passport from 'passport';

import * as clientController from '../controllers/clientController';

const router = express.Router();

router.put('/inscription', clientController.client_inscription_put);

router.post('/connexion', clientController.client_connexion_post);

export default router;