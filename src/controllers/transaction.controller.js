const { Customer, Transaction } = require('../models');
const sequelize = require('../config/database');

exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const customer = await Customer.findByPk(req.user.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.balance += amount;
    await customer.save();

    await Transaction.create({
      customerId: customer.id,
      type: 'deposit',
      amount,
    });

    res.json({ message: 'Deposit successful', balance: customer.balance });
  } catch (error) {
    console.error('Deposit Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.withdraw = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount number is invalid' });
    }

    // lock update row until transaction is completed
    const customer = await Customer.findByPk(req.user.id, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!customer) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (amount > customer.balance) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    customer.balance -= amount;
    await customer.save({ transaction });

    await Transaction.create({
      customerId: customer.id,
      type: 'withdrawal',
      amount,
    }, { transaction });

    await transaction.commit();
    res.json({ message: `Withdraw money successfully, current balance is ${customer.balance}` });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Withdraw Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.transfer = async (req, res) => {
  try {
    const { receiverId, amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero' });

    const sender = await Customer.findByPk(req.user.id);
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const receiver = await Customer.findByPk(receiverId);
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    await Transaction.create({
      customerId: sender.id,
      type: 'transfer',
      amount,
      receiverId: receiver.id,
    });

    res.json({ message: 'Transfer successful', balance: sender.balance });
  } catch (error) {
    console.error('Transfer Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
