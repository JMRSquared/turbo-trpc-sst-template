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

const corsConfig = {
  responseMeta() {
    console.log('responseMeta');
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    };
  },
};

async function main() {
  const app = express();

  // Enable CORS for all routes
  app.use(cors());

  // Request logger
  app.use((req, _res, next) => {
    console.log('⬅️ ', req.method, req.path, JSON.stringify(req.body ?? req.query));
    next();
  });

  // tRPC middleware
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error, type, path, input, ctx, req }) {
        console.error(`Error in ${type} ${path}:`, error);
      },
    })
  );

  app.get('/', (_req, res) => {
    res.send('hello');
  });

  app.listen(3000, err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('🚀 Express server listening on port 3000');
    console.log('📡 tRPC endpoint: http://localhost:3000/trpc');
  });
}

void main();
