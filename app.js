const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const productRoute = require('./route/productRoute');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(logger);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! Your API is working.');
});

// Routes
app.use('/api/products', auth, productRoute);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  if (app._router && app._router.stack) {
    console.log('\n Registered Routes:');
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        // Direct route (like '/')
        console.log(`→ ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
      } else if (middleware.name === 'router' && middleware.handle.stack) {
        // Router-level routes (like '/api/products')
        middleware.handle.stack.forEach((handler) => {
          const route = handler.route;
          if (route) {
            console.log(
              `→ ${Object.keys(route.methods).join(', ').toUpperCase()} /api/products${route.path === '/' ? '' : route.path}`
            );
          }
        });
      }
    });
  } else {
    console.log(' No routes registered yet.');
  }
});
