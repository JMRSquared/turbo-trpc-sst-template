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

export const test = awsLambdaRequestHandler({
  router: router(appRouter.ping),
  createContext,
});
