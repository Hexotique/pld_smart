import express from 'express';
import passport from 'passport';

import * as clientController from '../controllers/controleurClient';

const router = express.Router();

router.put('/inscription', clientController.inscription_client_put);

router.post('/connexion', clientController.connexion_client_post);



export default router;