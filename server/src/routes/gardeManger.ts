import express from 'express';

import * as controleurGardeManger from '../controllers/controleurGardeManger';

const router = express.Router();

router.get('/ajouter-produit-alamano',controleurGardeManger.produit_ajouter_put);

router.delete('/supprimer-produit', controleurGardeManger.produit_supprimer_delete);

router.put('/recuperer-contenu', controleurGardeManger.produit_supprimer_delete);

export default router;