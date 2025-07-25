import { existsSync, mkdirSync, readFileSync, rmdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { type AppRouter, appRouter } from '~/router';

const handlersDir = './src/generated';

const exclude = ['_def', 'createCaller'];

const extractRouterKeys = (router: AppRouter, keys: Set<string>, prefix = ''): Set<string> => {
  for (const [key, value] of Object.entries(router)) {
    if (exclude.includes(key)) continue;
    if (!value) continue;

    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (!JSON.stringify(value)) {
      keys.add(fullKey);
    }

    if (value && typeof value === 'object' && !value.procedure) {
      extractRouterKeys(value, keys, fullKey);
    }
  }

  return keys;
};

const keys = Array.from(extractRouterKeys(appRouter, new Set<string>()));

const lines = readFileSync('./src/lambda.ts', 'utf8').split('\n');

for (const key of keys) {
  const handlerName = key.replace(/\./g, '_');
  const action = key.split('.').pop();
  lines.push(
    `export const ${handlerName} = withCors(awsLambdaRequestHandler({`,
    `  router: router({${action}: appRouter.${key}}),`,
    '  createContext,',
    '  ...corsConfig,',
    '}))',
    '\n'
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
    keys.map(key => ({
      name: toKebabCase(key.replace(/\./g, '-')),
      handler: path.join('apps/api', handlersDir, `handler.${key.replace(/\./g, '_')}`),
      path: toKebabCase(key.replace(/\./g, '/')),
      procedure: key,
    })),
    null,
    2
  )} as const;
    `
);
console.log('Generated handlers:', keys.join(', '));

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // handle camelCase or PascalCase
    .replace(/[\s_]+/g, '-') // replace spaces and underscores with hyphens
    .toLowerCase(); // convert everything to lowercase
}
