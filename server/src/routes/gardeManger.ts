import express from 'express';
import passport from 'passport';

import * as controleurGardeManger from '../controllers/controleurGardeManger';

const router = express.Router();

router.put('/ajouter-produit-alamano', passport.authenticate('jwt', { session: false }), controleurGardeManger.ajouter_produit_alamano_put);

router.post('/modifier-quantite', passport.authenticate('jwt', { session: false }), controleurGardeManger.modifier_quantite_post);

router.delete('/supprimer-produit/:idproduit', passport.authenticate('jwt', { session: false }), controleurGardeManger.supprimer_produit_delete);

router.get('/recuperer-contenu', passport.authenticate('jwt', { session: false }), controleurGardeManger.recuperer_contenu_get);

router.get('/recuperer-produits', passport.authenticate('jwt', { session: false }), controleurGardeManger.recuperer_produits_get);

router.put('/scan-article/:codebar', passport.authenticate('jwt', { session: false }), controleurGardeManger.ajouter_produit_scan_put);


// route de test
// router.get('/testgardemanger', controleurGardeManger.gardemanger_test);


export default router;