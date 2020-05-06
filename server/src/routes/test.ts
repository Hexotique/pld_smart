import express from 'express';
import * as controleurTest from '../controllers/controleurTest';

const router = express.Router();

router.post('/init', controleurTest.init);

router.post('/cat', controleurTest.init_cat);

router.post('/init-article', controleurTest.init_articles);

router.get('/codes', controleurTest.get_codebar);

router.put('/test-client', controleurTest.test_client_ticket);

router.put('/test-regulier', controleurTest.test_achat_regulier);

router.put('/recommend', controleurTest.recuperer_liste_course);

router.put('/clean-regulier', controleurTest.clean_achat_regulier);

export default router;