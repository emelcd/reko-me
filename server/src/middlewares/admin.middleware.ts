import { Request, Response, NextFunction } from 'express';

const adminSecret : string = process.env.ADMIN_SECRET || 'secret';

const extractJwtAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    if (token !== adminSecret) {
      res.status(401).json({
        message: 'Invalid token',
      });
    } else {
      next();
    }
  } else {
    res.status(401).json({
      message: 'No token provided',
    });
  }
};

export default extractJwtAdmin;
