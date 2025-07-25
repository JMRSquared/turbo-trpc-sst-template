import {
  type CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { appRouter } from '~/router';
import { router } from '~/trpc';

export function createContext({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) {
  console.log({ event, context });
  return {
    db: 'db',
    user: event.headers['x-user'],
  };
}

const corsConfig = {
  responseMeta() {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  },
};

export function withCors(trpcHandler: ReturnType<typeof awsLambdaRequestHandler>) {
  return async (event: any, context: any) => {
    if (event.requestContext?.http?.method === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'OPTIONS,POST',
        },
        body: '',
      };
    }

    return trpcHandler(event, context);
  };
}

export const test = withCors(
  awsLambdaRequestHandler({
    router: router(appRouter.ping),
    createContext,
    ...corsConfig,
  })
);
