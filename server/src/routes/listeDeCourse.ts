import express from 'express';
import passport from 'passport';

import * as controleurListeDeCourses from '../controllers/controleurListeDeCourses';

const router = express.Router();

router.put('/ajouter-produit', passport.authenticate('jwt', { session: false }), controleurListeDeCourses.produit_ajouter_put);

router.delete('/supprimer-produit', passport.authenticate('jwt', { session: false }), controleurListeDeCourses.produit_supprimer_delete);

// route de test
router.get('/test', controleurListeDeCourses.produit_test);

export default router;