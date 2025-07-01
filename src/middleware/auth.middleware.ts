import { Request, Response, NextFunction } from 'express';
import jwtToken from '../utils/jwtToken';
import BadRequest from '../error/error';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = jwtToken.verifiedToken(req);
    if (!user || typeof user !== 'object' || !user.id) {
      throw new BadRequest('Unauthorized access');
    }

    // attach user info to request
    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
};
