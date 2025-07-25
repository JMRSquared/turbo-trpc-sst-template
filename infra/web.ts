import { handlers } from '../apps/api/src/generated/handlers';

export function Web({ api }: Props) {
  const web = new sst.aws.StaticSite('Web', {
    path: 'apps/web',
    build: {
      output: 'dist',
      command: 'yarn build',
    },
    environment: {
      VITE_API_URL: api.url,
      VITE_API_SERVERS: JSON.stringify(handlers.reduce((acc, handler) => {
        acc[handler.path] = `${api.url}/${handler.path}`;
        return acc;
      }, {})),
    },
  });

  return {
    url: web.url,
  };
}

interface Props {
  api: sst.aws.ApiGatewayV2;
}
