import express from 'express';

import * as controleurListeDeCourses from '../controllers/controleurListeDeCourses';

const router = express.Router();

router.put('/ajouter-produit',controleurListeDeCourses.produit_ajouter_put);

router.delete('/supprimer-produit', controleurListeDeCourses.produit_supprimer_delete);

export default router;