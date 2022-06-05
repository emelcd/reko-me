import { Router } from 'express';
import recoController from '../../controllers/Reco.controller';

const recoPublicRouter = Router();

recoPublicRouter.use('/', recoController.getAllPublic);

export default recoPublicRouter;
