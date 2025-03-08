const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'sender',
      });

      Transaction.belongsTo(models.Customer, {
        foreignKey: 'receiverId',
        as: 'receiver',
      });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id',
        },
      },
      receiverId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Customers',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM('deposit', 'withdrawal', 'transfer'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );

  return Transaction;
};
