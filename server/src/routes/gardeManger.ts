import express from 'express';

import * as controleurGardeManger from '../controllers/controleurGardeManger';

const router = express.Router();

router.put('/ajouter-produit-alamano',controleurGardeManger.ajouter_produit_alamano_put);

router.delete('/supprimer-produit', controleurGardeManger.supprimer_produit_delete);

router.put('/recuperer-contenu', controleurGardeManger.recuperer_contenu_get);

export default router;