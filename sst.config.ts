/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'PROJECT_NAME',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {},
      },
    };
  },
  async run() {
    const { Web, Api } = await import('./infra');

    //Web();
    Api();
  },
});
