import { Middleware } from '../types';
import { addCors } from '../controllers/CorsController';
import { Server } from 'restify';

const corsMiddleware: Middleware = (server: Server) => {
  server.use(addCors);
  return server;
};

export default corsMiddleware;
