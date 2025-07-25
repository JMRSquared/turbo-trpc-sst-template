import { createTRPCProxyClient, httpBatchLink, OperationLink } from '@trpc/client';

export const trpc = createTRPCProxyClient<any>({
  links: [
     // create a custom ending link
     (runtime) => {
      const links = JSON.parse(import.meta.env.VITE_API_SERVERS ?? '{}');

        const servers = Object.entries(links).reduce((acc, [key, url]) => {
          acc[key] = httpBatchLink({ url: url as string })(runtime);
          
          return acc;
        }, {} as Record<string, OperationLink<any, any, any>>);

        console.log({ servers });

        return (ctx) => {
          const { op } = ctx;
          console.log({ op });
          // split the path by `.` as the first part will signify the server target name
          const pathParts = op.path.split('.');
  
          // first part of the query should be `server1` or `server2`
          const serverName = pathParts.shift() as string as keyof typeof servers;
  
          // combine the rest of the parts of the paths
          // -- this is what we're actually calling the target server with
          const path = pathParts.join('.');
          console.log(`calling ${serverName} on path ${path}`, {
            input: op.input,
          });
  
          const link = servers[op.path];
  
          return link({
            ...ctx,
            ...op
          });
        };
      },
  ],
});

