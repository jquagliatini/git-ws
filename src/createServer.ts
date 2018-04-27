import { Server, plugins } from 'restify';

import { Middleware } from './types';
import routes from './routes';

const createServer: Middleware = (server: Server): Server => {
  server.use(plugins.queryParser());
  return routes.reduce((server, route) => route(server), server);
};

export default createServer;
