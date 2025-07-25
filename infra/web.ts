export function Web({ api }: Props) {
  const web = new sst.aws.StaticSite('Web', {
    path: 'apps/web',
    build: {
      output: 'dist',
      command: 'yarn build',
    },
    environment: { VITE_API_URL: api.url },
  });

  return {
    url: web.url,
  };
}

interface Props {
  api: sst.aws.ApiGatewayV2;
}
