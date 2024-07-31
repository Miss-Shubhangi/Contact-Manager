import React from 'react'

function PageNotFound() {
  return (
    <div style="text-align: center; color: #333; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #f5f7fa, #c3cfe2);">
    <h1 style="font-size: 10em; margin: 0; color: #ff6f61;">404 NOT FOUND</h1>
    <h2 style="font-size: 2em; margin: 0;">Oops! Page not found.</h2>
    <p style="font-size: 1.2em; margin: 20px 0;">The page you're looking for doesn't exist or has been moved.</p>
    </div>
  )
}

export default PageNotFound