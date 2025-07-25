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

export const ping_anotherRouter_doPingInside = withCors(
  awsLambdaRequestHandler({
    router: router({ doPingInside: appRouter.ping.anotherRouter.doPingInside }),
    createContext,
    ...corsConfig,
  })
);

export const ping_doPing = withCors(
  awsLambdaRequestHandler({
    router: router({ doPing: appRouter.ping.doPing }),
    createContext,
    ...corsConfig,
  })
);

export const ping_doTowPing = withCors(
  awsLambdaRequestHandler({
    router: router({ doTowPing: appRouter.ping.doTowPing }),
    createContext,
    ...corsConfig,
  })
);

export const pong_doPong = withCors(
  awsLambdaRequestHandler({
    router: router({ doPong: appRouter.pong.doPong }),
    createContext,
    ...corsConfig,
  })
);

export const pong_doTwoPong = withCors(
  awsLambdaRequestHandler({
    router: router({ doTwoPong: appRouter.pong.doTwoPong }),
    createContext,
    ...corsConfig,
  })
);
