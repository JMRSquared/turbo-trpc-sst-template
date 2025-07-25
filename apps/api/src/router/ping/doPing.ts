import { publicProcedure, router } from '~/trpc';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const doPing = publicProcedure.query(async () => {
  await sleep(1000);

  return 'Ping';
});

export const anotherRouter = router({
  doPingInside: publicProcedure.query(async () => {
    await sleep(1000);

    return 'Ping';
  }),
});
