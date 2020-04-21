import express from 'express';

import clientRoutes from './client';

export const init_rt = (app: express.Application) => {
    app.use('/api/client', clientRoutes);
}