import express from 'express';
import passport from 'passport';

import * as controleurGardeManger from '../controllers/controleurGardeManger';

const router = express.Router();

router.put('/ajouter-produit-alamano', passport.authenticate('jwt', { session: false }), controleurGardeManger.ajouter_produit_alamano_put);

router.post('/modifier-quantite', passport.authenticate('jwt', { session: false }), controleurGardeManger.modifier_quantite_post);

router.get('/recuperer-contenu', passport.authenticate('jwt', { session: false }), controleurGardeManger.recuperer_contenu_get);

// route de test
// router.get('/testgardemanger', controleurGardeManger.gardemanger_test);


export default router;