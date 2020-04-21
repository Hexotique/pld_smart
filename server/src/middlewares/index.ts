import { Application } from 'express';
import { initPassport } from './passport';
import { initOther } from './other';

export const init_mw = (app: Application) => {
    initPassport(app);
    initOther(app);
}