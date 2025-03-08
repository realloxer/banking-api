// tests/controllers/manager.controller.test.js

const { getTotalBankBalance, getAllTransactions } = require('../../src/controllers/manager.controller');
const { Customer, Transaction } = require('../../src/models');
const mockRequest = () => ({ body: {}, query: {} });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

jest.mock('jsonwebtoken');
jest.mock('../../src/models');

describe('Manager Controller Tests', () => {
  describe('getTotalBankBalance', () => {
    it('return the total bank balance', async () => {
      const req = mockRequest();
      const res = mockResponse();

      Customer.sum.mockResolvedValue(10000); 
      
      await getTotalBankBalance(req, res);
      
      expect(res.json).toHaveBeenCalledWith({ totalBalance: 10000 });
    });
    
    it('fetching the total balance fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      Customer.sum.mockRejectedValue(new Error('Database error')); // Simulate an error

      await getTotalBankBalance(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('getAllTransactions', () => {
    it('return all transactions with correct filters and sorting', async () => {
      const req = mockRequest();
      req.query.sortBy = 'amount';
      req.query.order = 'ASC';
      req.query.type = 'deposit';
      const res = mockResponse();
      
      Transaction.findAll.mockResolvedValue([
        { id: 1, amount: 100, type: 'deposit' }, 
        { id: 2, amount: 50, type: 'deposit' }
      ]);
      
      await getAllTransactions(req, res);
      
      expect(Transaction.findAll).toHaveBeenCalledWith(expect.objectContaining({
        where: { type: 'deposit' },
        order: [['amount', 'ASC']],
      }));
      expect(res.json).toHaveBeenCalledWith({
        transactions: [
          { id: 1, amount: 100, type: 'deposit' },
          { id: 2, amount: 50, type: 'deposit' }
        ],
      });
    });
    
    it('return 400 for invalid order', async () => {
      const req = mockRequest();
      req.query.order = 'MMMM';
      const res = mockResponse();
      
      await getAllTransactions(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid sort field or order' });
    });

    it('return 400 for invalid sortBy', async () => {
        const req = mockRequest();
        req.query.sortBy = '123';
        const res = mockResponse();
        
        await getAllTransactions(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid sort field or order' });
      });
    
    it('return 400 for invalid customerId', async () => {
      const req = mockRequest();
      req.query.customerId = '77777';
      const res = mockResponse();
      
      await getAllTransactions(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid customerId format' });
    });

    it('return 500 when fetching transactions fails', async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      Transaction.findAll.mockRejectedValue(new Error('Database error'));
      
      await getAllTransactions(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
