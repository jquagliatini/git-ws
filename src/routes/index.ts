import { Middleware } from '../types';

import { corsMiddleware, preflightMiddleware } from '../middlewares';

import balanceRoute from './balanceRoute';

const routes: Middleware[] = [
  corsMiddleware,
  balanceRoute,
  preflightMiddleware,
];

export default routes;
