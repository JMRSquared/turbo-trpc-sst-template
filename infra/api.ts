import { handlers } from '../apps/api/src/generated/handlers';

export function Api() {
  const api = new sst.aws.ApiGatewayV2('Api', {
    cors: {
      allowHeaders: ['content-type', 'authorization'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowOrigins: ['*'],
    },
  });

  for (const { key, value } of handlers) {
    api.route(`ANY /trpc/${key}/{proxy+}`, {
      handler: value,
      name: `${$app.name}-${$app.stage}-${key}`,
    });
  }

  return {
    api,
  };
}
