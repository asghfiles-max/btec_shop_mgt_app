function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  // Handle Supabase configuration errors
  if (err.message && err.message.includes('Supabase configuration')) {
    return res.status(500).json({
      error: 'Service configuration error',
      message: 'Database service is not properly configured'
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'Authentication failed'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
      message: 'Please login again'
    });
  }

  const status = err.status || 500;
  const message = err.message || 'An internal server error occurred';
  
  // Don't expose stack traces in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(status).json({
    error: message,
    ...(isDevelopment && { stack: err.stack })
  });
}

module.exports = { errorHandler };
