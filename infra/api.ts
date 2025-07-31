import { handlers } from '../apps/api/src/generated/handlers';

export function Api() {
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
  });

  for (const { handler, name, path } of handlers) {
    api.route(`ANY /${path}/{proxy+}`, {
      handler,
      name: `${apiName}-${name}`,
      environment: {
        AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
        AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
      },
    });
  }

  return {
    api,
  };
}
