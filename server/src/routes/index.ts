import express from 'express';

import authRoutes from './auth';

export const init_rt = (app: express.Application) => {
    app.use('/api/auth', authRoutes);
}