import express from 'express';
import passport from 'passport';

import * as controleurAchatRegulier from '../controllers/controleurAchatRegulier';

const router = express.Router();

router.put('/ajouter-produits', passport.authenticate('jwt', { session: false }), controleurAchatRegulier.produit_ajouter_put);

router.delete('/supprimer-produits', passport.authenticate('jwt', { session: false }), controleurAchatRegulier.produit_supprimer_delete);

router.get('/recuperer', passport.authenticate('jwt', { session: false }), controleurAchatRegulier.recuperer_get);

// route de test
// router.get('/test', controleurAchatRegulier.produit_test);

export default router;