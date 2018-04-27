import { Server } from 'restify';

import AccountController from '../controllers/AccountController';

export default function bankRoute(server: Server): Server {
  server.get('/balance', AccountController.getBalance);

  return server;
}
