import { handlers } from '../apps/api/src/generated/handlers';

export function Api() {
  const apiName = `${$app.name}-${$app.stage}`;

  const api = new sst.aws.ApiGatewayV2('Api', {
    cors: false,
    transform: {
      api: {
        name: apiName,
      },
    },
  });

  for (const { handler, name, path } of handlers) {
    api.route(`ANY /${path}/{proxy+}`, {
      handler,
      name: `${apiName}-${name}`,
    });
  }

  return {
    api,
  };
}
