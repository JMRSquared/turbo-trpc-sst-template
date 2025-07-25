import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type OperationLink, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'api/router';

export const trpc = createTRPCReact<AppRouter>();

const queryClient = new QueryClient();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  return (
    <trpc.Provider
      client={trpc.createClient({
        links: [
          runtime => {
            const links = JSON.parse(import.meta.env.VITE_API_SERVERS ?? '{}');
            if (Object.keys(links).length === 0) {
              console.log('No links found, using default');
              return httpBatchLink({ url: 'http://localhost:3000/trpc' })(runtime);
            }

            console.log('-----------------');
            const servers = Object.entries(links).reduce(
              (acc, [key, path]) => {
                const url = `${import.meta.env.VITE_API_URL}/${path}`;
                console.log({ key, path, url });
                acc[key] = httpBatchLink({ url })(runtime);

                return acc;
              },
              {} as Record<string, OperationLink<AppRouter, any, any>>
            );

            console.log('-----------------');

            console.log({ servers });

            return ctx => {
              const { op } = ctx;
              // split the path by `.` as the first part will signify the server target name
              const pathParts = op.path.split('.');

              // first part of the query should be `server1` or `server2`
              const serverName = pathParts.shift() as string as keyof typeof servers;

              // combine the rest of the parts of the paths
              // -- this is what we're actually calling the target server with

              const link = servers[op.path];
              console.log(`calling ${serverName} on path ${op.path}`, {
                input: op.input,
                link,
                op,
                servers,
              });

              const result = link(ctx);

              console.log({ result });

              return result;
            };
          },
        ],
      })}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
