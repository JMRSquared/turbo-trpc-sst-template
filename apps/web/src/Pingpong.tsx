import { Test } from './Test';
import { trpc } from './trpc/TRPCProvider';

export function PingPong() {
  const pingQuery = trpc.ping.doPing.useQuery(undefined, { enabled: false });
  const pongQuery = trpc.pong.doPong.useQuery(undefined, { enabled: false });
  const pongTwoQuery = trpc.pong.doTwoPong.useQuery({ message: 'Hello' }, { enabled: false });
  const pingInsideQuery = trpc.ping.anotherRouter.doPingInside.useQuery(undefined, {
    enabled: false,
  });
  const applicationsQuery = trpc.applications.list.useQuery(undefined, { enabled: false });

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>tRPC Demo</h1>

      <Test
        label="Ping"
        isLoading={pingQuery.isLoading}
        handleClick={() => pingQuery.refetch()}
        data={pingQuery.data}
        error={pingQuery.error}
      />
      <Test
        label="Pong"
        isLoading={pongQuery.isLoading}
        handleClick={() => pongQuery.refetch()}
        data={pongQuery.data}
        error={pongQuery.error}
      />
      <Test
        label="Pong Two"
        isLoading={pongTwoQuery.isLoading}
        handleClick={() => pongTwoQuery.refetch()}
        data={pongTwoQuery.data}
        error={pongTwoQuery.error}
      />
      <Test
        label="Ping Inside"
        isLoading={pingInsideQuery.isLoading}
        handleClick={() => pingInsideQuery.refetch()}
        data={pingInsideQuery.data}
        error={pingInsideQuery.error}
      />
      <Test
        label="List Job Applications (Airtable)"
        isLoading={applicationsQuery.isLoading}
        handleClick={() => applicationsQuery.refetch()}
        data={applicationsQuery.data}
        error={applicationsQuery.error}
      />
    </div>
  );
}
