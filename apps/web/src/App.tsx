import { useState } from 'react';
import { trpc } from './trpc/TRPCProvider';

const App = () => {
  const [message, setMessage] = useState('');

  const pingQuery = trpc.ping.doPing.useQuery(undefined, { enabled: false });

  const pongQuery = trpc.pong.doPong.useQuery(undefined, { enabled: false });

  const handlePing = () => {
    pingQuery.refetch();
  };

  const handlePong = () => {
    pongQuery.refetch();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>tRPC Demo</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter a message"
          style={{
            padding: '0.5rem',
            marginRight: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '200px',
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={handlePing}
          disabled={pingQuery.isLoading}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {pingQuery.isLoading ? 'Loading...' : 'Call Ping (Query)'}
        </button>

        <button
          type="button"
          onClick={handlePong}
          disabled={pongQuery.isLoading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {pongQuery.isLoading ? 'Loading...' : 'Call Pong (Query)'}
        </button>
      </div>

      <div>
        <h3>Results:</h3>

        {pingQuery.data && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#e7f3ff',
              borderRadius: '4px',
            }}
          >
            <strong>Ping Response:</strong>
            <pre>{JSON.stringify(pingQuery.data, null, 2)}</pre>
          </div>
        )}

        {pongQuery.data && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#e8f5e8',
              borderRadius: '4px',
            }}
          >
            <strong>Pong Response:</strong>
            <pre>{JSON.stringify(pongQuery.data, null, 2)}</pre>
          </div>
        )}

        {(pingQuery.error || pongQuery.error) && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#ffe6e6',
              borderRadius: '4px',
            }}
          >
            <strong>Error:</strong>
            <pre>{JSON.stringify(pingQuery.error || pongQuery.error, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
