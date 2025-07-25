import { existsSync, mkdirSync, readFileSync, rmdirSync, writeFileSync } from 'node:fs';
import { appRouter } from '../apps/trpc/src/trpc/router';

const apiDir = 'apps/trpc/src';
const handlersDir = `${apiDir}/generated`;

const exclude = ['_def', 'createCaller'];
const keys = Object.keys(appRouter)
  .filter(key => !exclude.includes(key))
  .map(key => key as keyof typeof appRouter);

const lines = readFileSync(`${apiDir}/lambda.ts`, 'utf8').split('\n');

for (const key of keys) {
  lines.push(
    `export const ${key} = awsLambdaRequestHandler({`,
    `  router: router(appRouter.${key}),`,
    '  createContext,',
    '});',
    ''
  );
}

const output = lines.join('\n');
if (existsSync(handlersDir)) {
  rmdirSync(handlersDir, { recursive: true });
}
mkdirSync(handlersDir);
writeFileSync(`${handlersDir}/handler.ts`, output);
writeFileSync(
  `${handlersDir}/handlers.ts`,
  `export const handlers = ${JSON.stringify(
    keys.map(key => ({ key, value: `${handlersDir}/handler.${key}` })),
    null,
    2
  )} as const;
    `
);
console.log('Generated handlers:', keys.join(', '));
