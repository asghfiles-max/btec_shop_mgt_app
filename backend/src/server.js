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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(limiter);
app.use(morgan('combined'));

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
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
