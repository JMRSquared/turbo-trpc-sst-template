import { router } from '../trpc';

import * as pingRouter from './ping';
import * as pongRouter from './pong';

export const appRouter = router({
  ping: pingRouter,
  pong: pongRouter,
});

export type AppRouter = typeof appRouter;
