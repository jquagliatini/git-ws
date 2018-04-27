import { createServer as createRestifyServer } from 'restify';

import createServer from './src/createServer';
import { configFactory } from './src/utils';

const config = configFactory();

const server = createServer(createRestifyServer({ name: 'bankaccount' }));

server.listen(config('APP_PORT'), () => {
  console.log(`server listens on ${config('APP_PORT')}...`);
});
