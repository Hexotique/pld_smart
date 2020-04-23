import express from 'express';
import passport from 'passport';

import * as clientController from '../controllers/controleurClient';

const router = express.Router();

router.put('/inscription', clientController.inscription_client_put);

router.post('/connexion', clientController.connexion_client_post);

// route de test
router.get('/test', clientController.test_client_ticket);

export default router;