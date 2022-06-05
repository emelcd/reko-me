import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret : string = process.env.JWT_SECRET || 'secret';

const extractJwtEmail = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: 'Invalid token',
        });
      } else {
        req.body.token = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: 'No token provided',
    });
  }
};

export default extractJwtEmail;
