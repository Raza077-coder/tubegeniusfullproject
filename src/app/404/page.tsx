export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <h2 style={{ color: '#666' }}>Page Not Found</h2>
      <p style={{ color: '#999', marginTop: '1rem' }}>
        The page you are looking for does not exist.
      </p>
      <a 
        href="/" 
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Go Back Home
      </a>
    </div>
  )
}
