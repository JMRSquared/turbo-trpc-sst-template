import { publicProcedure } from '~/trpc';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const doPong = publicProcedure.query(async () => {
  await sleep(1000);

  return 'Pong';
});
