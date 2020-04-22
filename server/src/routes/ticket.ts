import express from 'express';
import passport from 'passport';

import * as controleurTicket from '../controllers/controleurTicket';

const router = express.Router();

router.put('/creer-ticket', passport.authenticate('jwt'/*, {session : false}*/), controleurTicket.creer_ticket_put);

router.delete('/supprimer-ticket', passport.authenticate('jwt'/*, {session : false}*/), controleurTicket.supprimer_ticket_delete);

router.get('/recuperer-tickets', passport.authenticate('jwt'/*, {session : false}*/), controleurTicket.recuperer_tickets_get);

router.get('/recuperer-detail-ticket', /*passport.authenticate('jwt', {session : false}),*/ controleurTicket.recuperer_detail_ticket_get);

router.get('/test', /*passport.authenticate('jwt', {session : false}),*/ controleurTicket.test_ticket);


export default router;