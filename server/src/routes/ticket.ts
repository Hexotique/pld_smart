import express from 'express';

import * as controleurTicket from '../controllers/controleurTicket';

const router = express.Router();

router.put('/creer-ticket',controleurTicket.creer_ticket_put);

router.delete('/supprimer-ticket', controleurTicket.supprimer_ticket_delete);

router.get('/recuperer-tickets', controleurTicket.recuperer_tickets_get);

router.get('/recuperer-detail-ticket', controleurTicket.recuperer_detail_ticket_get);


export default router;