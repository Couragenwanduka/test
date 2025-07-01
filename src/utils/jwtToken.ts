import jwt from 'jsonwebtoken';
import { UserType } from '../interface/user';
import { Request } from 'express';

// Access token: short lifespan
const generateToken = (payload: Partial<UserType>) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '10h' });
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// Verifies access token from request
const verifiedToken = (req: Request) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return 'Unauthorized: Bearer token required';
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    // Forward the error so controller can handle TokenExpiredError
    throw error;
  }
};


export default {
  generateToken,

  verifiedToken,
};
