import middy from '@middy/core';
import cors from '@middy/http-cors';
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

export const test = middy(
  awsLambdaRequestHandler({
    router: router(appRouter.ping),
    createContext,
    ...corsConfig,
  })
)
  .use(cors())
  .use({
    before: async request => {
      console.log('Request:', {
        path: request.event.path,
        method: request.event.httpMethod,
        headers: request.event.headers,
      });
    },
    after: async request => {
      console.log('Response:', {
        statusCode: request.response?.statusCode,
        headers: request.response?.headers,
      });
    },
    onError: async request => {
      console.error('Error:', request.error);
    },
  });

export const ping_anotherRouter_doPingInside = middy(
  awsLambdaRequestHandler({
    router: router({ doPingInside: appRouter.ping.anotherRouter.doPingInside }),
    createContext,
    ...corsConfig,
  })
)
  .use(cors())
  .use({
    before: async request => {
      console.log('Request:', {
        path: request.event.path,
        method: request.event.httpMethod,
        headers: request.event.headers,
      });
    },
    after: async request => {
      console.log('Response:', {
        statusCode: request.response?.statusCode,
        headers: request.response?.headers,
      });
    },
    onError: async request => {
      console.error('Error:', request.error);
    },
  });

export const ping_doPing = middy(
  awsLambdaRequestHandler({
    router: router({ doPing: appRouter.ping.doPing }),
    createContext,
    ...corsConfig,
  })
)
  .use(cors())
  .use({
    before: async request => {
      console.log('Request:', {
        path: request.event.path,
        method: request.event.httpMethod,
        headers: request.event.headers,
      });
    },
    after: async request => {
      console.log('Response:', {
        statusCode: request.response?.statusCode,
        headers: request.response?.headers,
      });
    },
    onError: async request => {
      console.error('Error:', request.error);
    },
  });

export const ping_doTowPing = middy(
  awsLambdaRequestHandler({
    router: router({ doTowPing: appRouter.ping.doTowPing }),
    createContext,
    ...corsConfig,
  })
)
  .use(cors())
  .use({
    before: async request => {
      console.log('Request:', {
        path: request.event.path,
        method: request.event.httpMethod,
        headers: request.event.headers,
      });
    },
    after: async request => {
      console.log('Response:', {
        statusCode: request.response?.statusCode,
        headers: request.response?.headers,
      });
    },
    onError: async request => {
      console.error('Error:', request.error);
    },
  });

export const pong_doPong = middy(
  awsLambdaRequestHandler({
    router: router({ doPong: appRouter.pong.doPong }),
    createContext,
    ...corsConfig,
  })
)
  .use(cors())
  .use({
    before: async request => {
      console.log('Request:', {
        path: request.event.path,
        method: request.event.httpMethod,
        headers: request.event.headers,
      });
    },
    after: async request => {
      console.log('Response:', {
        statusCode: request.response?.statusCode,
        headers: request.response?.headers,
      });
    },
    onError: async request => {
      console.error('Error:', request.error);
    },
  });

export const pong_doTwoPong = middy(
  awsLambdaRequestHandler({
    router: router({ doTwoPong: appRouter.pong.doTwoPong }),
    createContext,
    ...corsConfig,
  })
)
  .use(cors())
  .use({
    before: async request => {
      console.log('Request:', {
        path: request.event.path,
        method: request.event.httpMethod,
        headers: request.event.headers,
      });
    },
    after: async request => {
      console.log('Response:', {
        statusCode: request.response?.statusCode,
        headers: request.response?.headers,
      });
    },
    onError: async request => {
      console.error('Error:', request.error);
    },
  });
