import express from 'express';
import { join } from 'path';

import { init_db } from './database';
import { init_mw } from './middlewares';
import { init_rt } from './routes';


let app = express();
init_db();
init_mw(app);
/*
app.get("/", (req, res) => { 
    res.sendFile(join(__dirname, "..", "..", "frontend", "dist", "index.html"));
})
*/

init_rt(app);

app.listen(process.env.SVR_PORT, () => {
    console.log(`Server listening on port ${process.env.SVR_PORT}.`);
});