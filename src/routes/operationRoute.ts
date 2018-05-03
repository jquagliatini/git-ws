import { Server } from 'restify';

import AccountController from '../controllers/AccountController';

export default function operationRoute(server: Server): Server {
  server.put('/add', AccountController.add);
  server.put('/sub', AccountController.sub);

  return server;
}
