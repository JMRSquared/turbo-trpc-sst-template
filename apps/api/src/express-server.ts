import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { appRouter } from '~/router';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== 'secret') {
      return null;
    }
    return {
      name: 'alex',
    };
  };

  return {
    db: {},
    user: 'name',
  };
};

async function main() {
  // express implementation
  const app = express();

  app.use(cors());

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, JSON.stringify(req.body ?? req.query));

    next();
  });

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.get('/', (_req, res) => {
    res.send('hello');
  });
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
}

void main();
