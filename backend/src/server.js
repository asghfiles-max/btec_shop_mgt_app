const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// ============================================================================
// TRUST PROXY CONFIGURATION (CRITICAL FOR VERCEL)
// ============================================================================
// Vercel sets X-Forwarded-For headers. Express must trust the first proxy
// to get real client IPs for rate limiting. Using '1' trusts only the first
// proxy, preventing rate limit bypass attacks.
// ============================================================================
app.set('trust proxy', 1);

// ============================================================================
// SECURITY MIDDLEWARE - HELMET
// ============================================================================
// Configure Helmet for Vercel serverless environment
// CSP disabled in development for easier debugging
app.use(helmet({
  contentSecurityPolicy: isProduction ? undefined : false,
  crossOriginEmbedderPolicy: false,
  hsts: isProduction ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  } : false
}));

// ============================================================================
// CORS CONFIGURATION
// ============================================================================
// Production requires explicit FRONTEND_URL for security
// Development allows wildcard for local testing
const corsOptions = {
  origin: process.env.FRONTEND_URL || (isProduction ? 'https://btec-shop-mgt-app-backend.vercel.app' : '*'),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
};
app.use(cors(corsOptions));

// ============================================================================
// BODY PARSERS (must come after CORS)
// ============================================================================
// Increased limits for file uploads (PDFs, images)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// RATE LIMITING CONFIGURATION
// ============================================================================
// Secure rate limiting with proper IP detection via trusted proxy
// Skips health checks and favicon to prevent false rate limits
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 100 : 200, // Stricter in production
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for health checks and favicon
  skip: (req) => {
    return req.path === '/health' || 
           req.path === '/api/health' || 
           req.path === '/favicon.ico' || 
           req.path === '/favicon.png';
  },
  // Use the trusted proxy headers to get real client IP
  // req.ip is automatically set by Express when trust proxy is configured
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress;
  },
  // Custom error message
  handler: (req, res, next, options) => {
    return res.status(429).json({
      error: 'Too many requests',
      message: options.message.error,
      retryAfter: Math.round(options.windowMs / 1000)
    });
  },
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use(limiter);

// ============================================================================
// LOGGING
// ============================================================================
// Morgan logging - use concise format for production
app.use(morgan(isProduction ? 'combined' : 'dev'));

// Root route - returns API info for direct backend access
app.get('/', (req, res) => {
  res.json({
    service: 'BTEC Shop Management Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/*',
      auth: '/api/auth',
      customers: '/api/customers',
      orders: '/api/orders',
      inventory: '/api/inventory',
      invoices: '/api/invoices',
      products: '/api/products',
      payments: '/api/payments',
      users: '/api/users',
      reports: '/api/reports'
    }
  });
});

// Favicon - return 204 No Content to prevent 404 errors
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Favicon PNG - return 204 No Content to prevent 404 errors
app.get('/favicon.png', (req, res) => {
  res.status(204).end();
});

// Health endpoint
app.get('/health', (req, res) => {
  const supabase = require('./config/supabase');
  res.json({
    status: 'ok',
    service: 'Backend API',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    supabase: supabase ? 'connected' : 'not configured'
  });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorHandler);

// Only listen if not running on Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;
