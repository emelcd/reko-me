import { Router } from 'express';
import recoController from '../../controllers/Reco.controller';

const recoPrivateRouter = Router();

recoPrivateRouter.get('/', recoController.ownedBy);
recoPrivateRouter.get('/:id', recoController.getById);
recoPrivateRouter.post('/', recoController.create);
recoPrivateRouter.delete('/:id', recoController.delete);
recoPrivateRouter.put('/:id', recoController.update);

export default recoPrivateRouter;
