import { Model } from 'mongoose';
import Reco from '../models/Reco.model';
import IReco from '../interfaces/Reco.interface';
import { CustomError } from '../utils/CustomError.util';

export class RecoService {
  constructor(private readonly recoModel: Model<IReco>) {
    this.recoModel = recoModel;
  }

  async getAllPublic(): Promise<IReco[]> {
    return this.recoModel.find({ isPublic: true });
  }

  async getOwnedBy(ownerId: string): Promise<IReco[]> {
    const recos = await this.recoModel.find({ owner: ownerId });
    return recos;
  }

  async getById(id: string, ownerId: string): Promise<IReco > {
    const reco = await this.recoModel.findById(id);
    if (!reco) {
      throw new CustomError('Reco not found', 404);
    }
    if (reco.owner.toString() !== ownerId) {
      throw new CustomError('You are not the owner of this reco', 401);
    }
    return reco;
  }

  async create(reco: IReco): Promise<IReco> {
    const RecoModel = this.recoModel;
    const newReco = new RecoModel(reco);
    return newReco.save();
  }

  async delete(id: string, ownerId: string) {
    const reco = await this.recoModel.findById(id);
    if (!reco) {
      throw new CustomError('Reco not found', 404);
    }
    if (reco.owner.toString() !== ownerId) {
      throw new CustomError('You are not the owner of this reco', 401);
    }
    return reco.remove();
  }

  async update(id: string, ownerId: string, reco: IReco): Promise<IReco> {
    const recoToUpdate = await this.recoModel.findById(id);
    if (!recoToUpdate) {
      throw new CustomError('Reco not found', 404);
    }
    if (recoToUpdate.owner.toString() !== ownerId) {
      throw new CustomError('You are not the owner of this reco', 401);
    }
    return recoToUpdate.updateOne(reco);
  }
}

export const recoService = new RecoService(Reco);
