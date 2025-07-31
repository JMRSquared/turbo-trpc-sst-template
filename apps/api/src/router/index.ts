import { router } from '../trpc';

import * as pingRouter from './ping';
import * as pongRouter from './pong';
import * as applicationsRouter from './applications';

export const appRouter = router({
  ping: pingRouter,
  pong: pongRouter,
  applications: applicationsRouter,
});

export type AppRouter = typeof appRouter;
