export const handlers = [
  {
    key: 'ping/anotherRouter/doPingInside',
    value: 'apps/api/src/generated/handler.ping_anotherRouter_doPingInside',
  },
  {
    key: 'ping/doPing',
    value: 'apps/api/src/generated/handler.ping_doPing',
  },
  {
    key: 'ping/doTowPing',
    value: 'apps/api/src/generated/handler.ping_doTowPing',
  },
  {
    key: 'pong/doPong',
    value: 'apps/api/src/generated/handler.pong_doPong',
  },
  {
    key: 'pong/doTwoPong',
    value: 'apps/api/src/generated/handler.pong_doTwoPong',
  },
] as const;
