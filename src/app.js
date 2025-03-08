const express = require('express');
const sequelize = require('./config/database');
const customerRoutes = require('./routes/customer.routes');
const transactionRoutes = require('./routes/transaction.routes');
const managerRoutes = require('./routes/manager.routes');

const app = express();
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/manager', managerRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected.');

    app.listen(3000, () => console.log('Server running on port 3000'));
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();