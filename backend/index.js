/**
 * Main Express application entry point
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const productsRoute = require('./src/routes/Product.routes')
const orderRoutes = require('./src/routes/order.routes')
const errorMiddleware = require('./src/middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoute)
app.use('/api/orders', orderRoutes)


// Error handling middleware (must be last)
app.use(errorMiddleware);

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Ensnacks API running on port ${PORT}`);
  });
});
