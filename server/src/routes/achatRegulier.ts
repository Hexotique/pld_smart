import express from 'express';
import passport from 'passport';

import * as controleurAchatRegulier from '../controllers/controleurAchatRegulier';

const router = express.Router();

router.get('/recuperer', passport.authenticate('jwt', { session: false }), controleurAchatRegulier.recuperer_liste_course);

export default router;