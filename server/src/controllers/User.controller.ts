import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService, userService } from '../services/User.service';

const secret = process.env.JWT_SECRET || 'secret';

class RecoController {
  service: UserService;

  constructor() {
    this.service = userService;
    this.register = this.register.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const reco = await this.service.register(req.body);
      const token = jwt.sign({ email: reco.email }, secret, { expiresIn: '72h' });
      res.cookie('token', token, { httpOnly: true });
      res.json(reco);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      const user = await this.service.userLogin(req.body.email, req.body.password);
      const token = jwt.sign({ email: user.email }, secret, { expiresIn: '72h' });
      res.cookie('token', token, { httpOnly: true });
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

const userController = new RecoController();

export default userController;
