import { Server } from 'restify';

type Middleware = (s: Server) => Server;

export default Middleware;
