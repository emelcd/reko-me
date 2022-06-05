import { Router } from 'express';
import recoRouter from './Reco.route';
import userRouter from './User.route';

const apiRouter = Router();

apiRouter.use('/reco', recoRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
