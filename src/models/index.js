const sequelize = require('../config/database');
const Customer = require('./customer')(sequelize);
const Transaction = require('./transaction')(sequelize);

const models = { Customer, Transaction };

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

module.exports = models;
