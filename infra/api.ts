import { handlers } from '../apps/api/src/generated/handlers';

export function Api({ secrets }: Input) {
  const apiName = `${$app.name}-${$app.stage}`;

  const api = new sst.aws.ApiGatewayV2('Api', {
    cors: {
      allowOrigins: ['*'],
      allowMethods: ['*'],
      allowHeaders: ['*'],
    },
    transform: {
      api: {
        name: apiName,
      },
    },
    link: [...secrets],
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

interface Input {
  secrets: sst.Secret[];
}
