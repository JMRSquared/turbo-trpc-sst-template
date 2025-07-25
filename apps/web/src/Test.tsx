export function Test({ label, isLoading, handleClick, data, error }: Props) {
  return (
    <div
      style={{
        marginBottom: '2rem',
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '4px',
      }}
    >
      <h2>{label}</h2>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
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
        {isLoading ? 'Loading...' : 'Call Ping (Query)'}
      </button>
      {data && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#e7f3ff',
            borderRadius: '4px',
          }}
        >
          <strong>Response:</strong>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#ffe6e6',
            borderRadius: '4px',
          }}
        >
          <strong>Error:</strong>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

interface Props {
  label: string;
  error: any | null;
  data: any;
  isLoading: boolean;
  handleClick: () => void;
}
