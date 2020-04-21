import express from 'express';

import authRoutes from './client';
import routesListeDeCourses from './listeDeCourse';
import routesGardeManger from './gardeManger';
import routesTicket from './ticket';

export const init_rt = (app: express.Application) => {
    app.use('/api/client', authRoutes);
    app.use('/api/liste-courses', routesListeDeCourses);
    app.use('/api/garde-manger', routesGardeManger);
    app.use('/api/ticket', routesTicket);
}