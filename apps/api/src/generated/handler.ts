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
  return {
    db: 'db',
    user: event.headers['x-user'],
  };
}

export const _ = awsLambdaRequestHandler({
  router: router(appRouter.ping),
  createContext,
});

export const ping_anotherRouter_doPingInside = awsLambdaRequestHandler({
  router: router({ doPingInside: appRouter.ping.anotherRouter.doPingInside }),
  createContext,
});

export const ping_doPing = awsLambdaRequestHandler({
  router: router({ doPing: appRouter.ping.doPing }),
  createContext,
});

export const ping_doTowPing = awsLambdaRequestHandler({
  router: router({ doTowPing: appRouter.ping.doTowPing }),
  createContext,
});

export const pong_doPong = awsLambdaRequestHandler({
  router: router({ doPong: appRouter.pong.doPong }),
  createContext,
});

export const pong_doTwoPong = awsLambdaRequestHandler({
  router: router({ doTwoPong: appRouter.pong.doTwoPong }),
  createContext,
});
