import { RequestHandler } from 'express';

import { checkUserConvo } from '../lib/checkUserConvo';

// Make sure user cannot access conversation they're not a part of
export const middlewareConvo: RequestHandler = async (req, res, next) => {
  const { conversationID } = req.params;
  const userId = res.locals.user.id;

  try {
    await checkUserConvo(userId, conversationID);
  } catch (e) {
    next(e);
  }
  next();
};
