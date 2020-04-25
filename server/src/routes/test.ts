import express from 'express';
import * as controleurTest from '../controllers/controleurTest';

const router = express.Router();

router.get('/init', controleurTest.init);

router.post('/cat', controleurTest.init_cat);

router.post('/article', controleurTest.creerArticle);


export default router;