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

// Trust proxy for Vercel (required for express-rate-limit)
// Use 1 to trust first proxy, true to trust all proxies
app.set('trust proxy', 1);

// Configure Helmet for Vercel serverless environment
app.use(helmet({
  contentSecurityPolicy: isProduction ? undefined : false,
  crossOriginEmbedderPolicy: false
}));

// Configure CORS for Vercel deployment
const corsOptions = {
  origin: process.env.FRONTEND_URL || (isProduction ? false : '*'),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Body parsers (must come after CORS)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure rate limiter for Vercel with proper IP detection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 100 : 200, // Stricter limit in production
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
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress;
  },
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use(limiter);

// Morgan logging - use concise format for production
app.use(morgan(isProduction ? 'combined' : 'dev'));

// Root route removed - frontend serves root URL

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
