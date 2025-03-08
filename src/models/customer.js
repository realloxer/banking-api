const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class Customer extends Model {
    async validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }

    static associate(models) {
      this.hasMany(models.Transaction, { foreignKey: 'customerId' });
      this.hasMany(models.Transaction, { foreignKey: 'receiverId' });
    }
  }

  Customer.init(
    {
      id: {
        type: DataTypes.UUID,             
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationalId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );

  Customer.beforeCreate(async (customer) => {
    customer.password = await bcrypt.hash(customer.password, 10);
  });

  return Customer;
};
