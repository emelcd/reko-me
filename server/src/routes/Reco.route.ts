import { Router } from 'express';
import extractJwtEmail from '../middlewares/jwt.middleware';
import recoPrivateRouter from './Reco/Reco.private.route';
import recoPublicRouter from './Reco/Reco.public.route';

const recoRouter = Router();

recoRouter.use('/me', extractJwtEmail, recoPrivateRouter);
recoRouter.use('/public', recoPublicRouter);

export default recoRouter;
