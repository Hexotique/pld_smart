import { Application } from 'express';

import bodyParser from 'body-parser';
import Cors from 'cors';

export const initOther = (app: Application) => {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    app.use(Cors());
}