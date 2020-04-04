import { Router } from 'express';

export const meRouter = Router();


// Get ONE user
meRouter.get('/', async (_req, res) => {
  const { id, firstName, lastName, email } = res.locals.user;
  res.json({ id, firstName, lastName, email });
});
