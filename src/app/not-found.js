export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <a 
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4F46E5',
          color: 'white',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Return to Homepage
      </a>
    </div>
  );
} 