import { Request, Response, Next, Server, Route } from 'restify';

import { Middleware } from '../types';

const preflightMiddleware: Middleware = (server: Server) => {
  const methodsOfPaths = server
    .getDebugInfo()
    .routes.reduce((rev: any, route: any) => {
      const path: string = route.path;
      return {
        ...rev,
        [path]: (rev[path] || []).concat(route.method),
      };
    }, {});

  Object.keys(methodsOfPaths).forEach((path: string) => {
    // we don't want to override existing OPTIONS handlers
    if (methodsOfPaths[path].some((k: string) => k === 'OPTIONS')) {
      return;
    }

    server.opts(path, (req: Request, res: Response, next: Next) => {
      res.header(
        'Access-Control-Allow-Methods',
        methodsOfPaths[path]
          .filter((m: string) => m !== 'OPTIONS')
          .map((m: string) => m.toUpperCase())
          .join(','),
      );
      res.send(204);
      return next();
    });
  });
  return server;
};

export default preflightMiddleware;
