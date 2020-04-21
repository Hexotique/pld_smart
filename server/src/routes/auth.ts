import express from 'express';
import passport from 'passport';

import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/inscription', authController.auth_inscription_post);

router.post('/connexion', authController.auth_connexion_post);

export default router;