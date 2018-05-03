import { Middleware } from '../types';

import { corsMiddleware, preflightMiddleware } from '../middlewares';

import balanceRoute from './balanceRoute';
import operationRoute from './operationRoute';

const routes: Middleware[] = [
  corsMiddleware,
  balanceRoute,
  operationRoute,
  preflightMiddleware,
];

export default routes;
