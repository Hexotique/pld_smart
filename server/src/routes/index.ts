import express from 'express';

import authRoutes from './client';
import routesListeDeCourses from './listeDeCourse';

export const init_rt = (app: express.Application) => {
    app.use('/api/client', authRoutes);
    app.use('/api/liste-courses', routesListeDeCourses);
}