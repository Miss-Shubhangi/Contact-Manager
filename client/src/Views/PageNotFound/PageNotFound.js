import React from 'react';

function PageNotFound() {
  return (
    <div style={{
      textAlign: 'center',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)'
    }}>
      <h1 style={{
        fontSize: '10em',
        margin: 0,
        color: '#ff6f61'
      }}>
        404 NOT FOUND
      </h1>
      <h2 style={{
        fontSize: '2em',
        margin: 0
      }}>
        Oops! Page not found.
      </h2>
      <p style={{
        fontSize: '1.2em',
        margin: '20px 0'
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
}

export default PageNotFound;
