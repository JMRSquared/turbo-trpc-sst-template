/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'wonderhire',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          region: 'us-east-1',
          allowedAccountIds: ['593755927349'],
        },
      },
    };
  },
  async run() {
    const { Web, Api } = await import('./infra');

    const { api } = Api();
    Web({ api });
  },
});
