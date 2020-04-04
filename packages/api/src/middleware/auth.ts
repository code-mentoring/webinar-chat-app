import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const middlewareAuth: RequestHandler = (req, res, next) => {
  const bearer = req.headers.authorization; // Format of `Bearer 1231213...`

  const throwError = (error: string, code = 401) => {
    res.status(code);
    return res.json({
      error
    });
  };

  if (!bearer) return throwError('No JWT supplied');

  const reg = /^Bearer\s(.*)$/;
  // Regex to check it's in the right format
  if (!/^Bearer\s.*$/.test(bearer)) {
    return throwError('Incorrect JWT format');
  }

  const token = reg.exec(bearer)![1];
  try {
    res.locals.user = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return throwError('Invalid JWT');
  }

  next();
};
