export const handlers = [
  {
    name: 'ping-another-router-do-ping-inside',
    handler: 'apps/api/src/generated/handler.ping_anotherRouter_doPingInside',
    path: 'ping/another-router/do-ping-inside',
    procedure: 'ping.anotherRouter.doPingInside',
  },
  {
    name: 'ping-do-ping',
    handler: 'apps/api/src/generated/handler.ping_doPing',
    path: 'ping/do-ping',
    procedure: 'ping.doPing',
  },
  {
    name: 'ping-do-tow-ping',
    handler: 'apps/api/src/generated/handler.ping_doTowPing',
    path: 'ping/do-tow-ping',
    procedure: 'ping.doTowPing',
  },
  {
    name: 'pong-do-pong',
    handler: 'apps/api/src/generated/handler.pong_doPong',
    path: 'pong/do-pong',
    procedure: 'pong.doPong',
  },
  {
    name: 'pong-do-two-pong',
    handler: 'apps/api/src/generated/handler.pong_doTwoPong',
    path: 'pong/do-two-pong',
    procedure: 'pong.doTwoPong',
  },
  {
    name: 'applications-list',
    handler: 'apps/api/src/generated/handler.applications_list',
    path: 'applications/list',
    procedure: 'applications.list',
  },
] as const;
