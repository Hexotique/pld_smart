import express from 'express';

import authRoutes from './client';
import routesAchatRegulier from './achatRegulier';
import routesGardeManger from './gardeManger';
import routesTicket from './ticket';
import routesTest from './test';

export const init_rt = (app: express.Application) => {
    app.use('/api/client', authRoutes);
    app.use('/api/achat-regulier', routesAchatRegulier);
    app.use('/api/garde-manger', routesGardeManger);
    app.use('/api/ticket', routesTicket);
    app.use('/api/test', routesTest);

}