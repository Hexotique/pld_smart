import express from 'express';

import * as controleurGardeManger from '../controllers/controleurGardeManger';

const router = express.Router();

router.put('/ajouter-produit-alamano', controleurGardeManger.ajouter_produit_alamano_put);

router.delete('/supprimer-produit', controleurGardeManger.supprimer_produit_delete);

router.get('/recuperer-contenu', controleurGardeManger.recuperer_contenu_get);

router.get('/test', controleurGardeManger.gardemanger_test);


export default router;