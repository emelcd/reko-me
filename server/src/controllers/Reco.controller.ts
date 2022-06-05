import { Request, Response } from 'express';
import { RecoService, recoService } from '../services/Reco.service';
import { isCustomErorr } from '../utils/CustomError.util';
import extractUser from '../utils/extractUser.util';

class RecoController {
  service: RecoService;

  constructor() {
    this.service = recoService;
    this.ownedBy = this.ownedBy.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.getAllPublic = this.getAllPublic.bind(this);
  }

  async ownedBy(req: Request, res: Response) {
    try {
      const owner = await extractUser(req.body.token);
      const recos = await this.service.getOwnedBy(owner);
      res.json(recos);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const owner = await extractUser(req.body.token);
      const reco = await this.service.getById(req.params.id, owner);
      res.json(reco);
    } catch (error) {
      if (isCustomErorr(error)) {
        res.status(error.status).json({
          message: error.message,
        });
      } else {
        res.status(500).json(error);
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const owner = await extractUser(req.body.token);
      const reco = await this.service.create({
        ...req.body,
        owner,
      });
      res.json(reco);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const owner = await extractUser(req.body.token);
      const reco = await this.service.delete(req.params.id, owner);
      res.json(reco);
    } catch (error) {
      if (isCustomErorr(error)) {
        res.status(error.status).json({
          message: error.message,
        });
      } else {
        res.status(500).json(error);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const owner = await extractUser(req.body.token);
      const reco = await this.service.update(req.params.id, owner, req.body);
      res.json(reco);
    } catch (error) {
      if (isCustomErorr(error)) {
        res.status(error.status).json({
          message: error.message,
        });
      } else {
        res.status(500).json(error);
      }
    }
  }

  async getAllPublic(req: Request, res: Response) {
    try {
      const recos = await this.service.getAllPublic();
      res.json(recos);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

const recoController = new RecoController();
export default recoController;
