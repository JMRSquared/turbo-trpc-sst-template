import { z } from 'zod';
import { publicProcedure } from '../../trpc';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const doTwoPong = publicProcedure
  .input(z.object({ message: z.string() }))
  .query(async ({ input, ctx }) => {
    await sleep(1000);

    console.log({ ctx, input });

    return 'Pong Pong';
  });
