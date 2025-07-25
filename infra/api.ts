import { handlers } from '../apps/trpc/src/generated/handlers';

export function Api() {
  // Create API Gateway with tRPC routes
  const api = new sst.aws.ApiGatewayV2('TrpcApi', {
    cors: {
      allowCredentials: true,
      allowHeaders: ['content-type', 'authorization'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowOrigins: ['http://localhost:5173', 'https://*.vercel.app'],
    },
  });

  for (const { key, value } of handlers) {
    api.route(`ANY /trpc/${key}`, value);
  }

  return {
    api: api.url,
  };
}
