import express from 'express';

import authRoutes from './client';

export const init_rt = (app: express.Application) => {
    app.use('/api/client', authRoutes);
}