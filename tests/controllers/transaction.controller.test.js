const { deposit, withdraw, transfer} = require('../../src/controllers/transaction.controller');
const { Customer, Transaction } = require('../../src/models');
// const sequelize = require('../../src/models');
const sequelize = require('../../src/config/database');

jest.mock('../../src/models');

describe('Transaction Controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Deposit', () => {
        let req, res;
        // beforeEach(() => {
        //     jest.clearAllMocks();
        //     req = {
        //         body: {},
        //         user: {
        //             id: 1
        //         },
        //     };
        //     res = {
        //         status: jest.fn().mockReturnThis(),
        //         json: jest.fn().mockReturnThis(),
        //     };
        // });

        // it('return 400 if amount is less than or equal to zero', async () => {
        //     req.body.amount = 0;

        //     await deposit(req, res);

        //     expect(res.status).toHaveBeenCalledWith(400);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Amount must be greater than zero'
        //     });
        // });

        // it('return 404 if customer is not found', async () => {
        //     req.body.amount = 100;
        //     Customer.findByPk.mockResolvedValueOnce(null);

        //     await deposit(req, res);

        //     expect(res.status).toHaveBeenCalledWith(404);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Customer not found'
        //     });
        // });

        // it('should successfully deposit and update balance', async () => {
        //     req.body.amount = 100;
        //     const mockCustomer = {
        //         id: 1,
        //         balance: 200,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     Customer.findByPk.mockResolvedValueOnce(mockCustomer);
        //     Transaction.create.mockResolvedValueOnce({}); // Simulate successful transaction

        //     await deposit(req, res);

        //     expect(mockCustomer.save).toHaveBeenCalled();
        //     expect(Transaction.create).toHaveBeenCalled();
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Deposit successful',
        //         balance: 300
        //     });
        // });

        // it('return 500 if an error occurs', async () => {
        //     req.body.amount = 100;
        //     const error = new Error('Internal Error');
        //     Customer.findByPk.mockRejectedValueOnce(error);

        //     await deposit(req, res);

        //     expect(res.status).toHaveBeenCalledWith(500);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Internal Server Error'
        //     });
        // });
    });

    describe('Transfer', () => {
        let req, res;

        // beforeEach(() => {
        //     jest.clearAllMocks();
        //     req = {
        //         body: {},
        //         user: {
        //             id: 1
        //         },
        //     };
        //     res = {
        //         status: jest.fn().mockReturnThis(),
        //         json: jest.fn().mockReturnThis(),
        //     };
        // });

        // it('return 400 if amount is less than or equal to zero', async () => {
        //     req.body.amount = 0;
        //     req.body.receiverId = 2;

        //     await transfer(req, res);

        //     expect(res.status).toHaveBeenCalledWith(400);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Amount must be greater than zero'
        //     });
        // });

        // it('return 404 if receiver customer is not found', async () => {
        //     req.body.amount = 100;
        //     req.body.receiverId = 2;
        //     const mockSender = {
        //         id: 1,
        //         balance: 200,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     Customer.findByPk.mockResolvedValueOnce(mockSender);
        //     Customer.findByPk.mockResolvedValueOnce(null); // Simulate receiver not found

        //     await transfer(req, res);

        //     expect(res.status).toHaveBeenCalledWith(404);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Receiver not found'
        //     });
        // });

        // it('return 400 if insufficient balance in sender account', async () => {
        //     req.body.amount = 500;
        //     req.body.receiverId = 2;
        //     const mockSender = {
        //         id: 1,
        //         balance: 100,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     Customer.findByPk.mockResolvedValueOnce(mockSender);
        //     const mockReceiver = {
        //         id: 2,
        //         balance: 200,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     Customer.findByPk.mockResolvedValueOnce(mockReceiver);

        //     await transfer(req, res);

        //     expect(res.status).toHaveBeenCalledWith(400);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Insufficient balance'
        //     });
        // });

        // it('should successfully transfer money and update balances', async () => {
        //     req.body.amount = 100;
        //     req.body.receiverId = 2;
        //     const mockSender = {
        //         id: 1,
        //         balance: 200,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     const mockReceiver = {
        //         id: 2,
        //         balance: 300,
        //         save: jest.fn().mockResolvedValue(true)
        //     };

        //     Customer.findByPk.mockResolvedValueOnce(mockSender);
        //     Customer.findByPk.mockResolvedValueOnce(mockReceiver);
        //     Transaction.create.mockResolvedValueOnce({});

        //     await transfer(req, res);

        //     expect(mockSender.save).toHaveBeenCalled();
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Transfer successful',
        //         balance: 100
        //     });
        // });

        // it('return 500 if an error occurs', async () => {
        //     req.body.amount = 100;
        //     req.body.receiverId = 2;
        //     const error = new Error('Internal Error');
        //     Customer.findByPk.mockRejectedValueOnce(error);

        //     await transfer(req, res);

        //     expect(res.status).toHaveBeenCalledWith(500);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Internal Server Error'
        //     });
        // });

        // it('return 500 if receiver save fails', async () => {
        //     req.body.amount = 100;
        //     req.body.receiverId = 2;
        //     const mockSender = {
        //         id: 1,
        //         balance: 200,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     const mockReceiver = {
        //         id: 2,
        //         balance: 300,
        //         save: jest.fn().mockRejectedValue(new Error('Save failed'))
        //     };

        //     Customer.findByPk.mockResolvedValueOnce(mockSender);
        //     Customer.findByPk.mockResolvedValueOnce(mockReceiver);
        //     Transaction.create.mockResolvedValueOnce({});

        //     await transfer(req, res);

        //     expect(res.status).toHaveBeenCalledWith(500);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Internal Server Error'
        //     });
        // });

        // it('should successfully transfer money and update balances', async () => {
        //     req.body.amount = 100;
        //     req.body.receiverId = 2;
        //     const mockSender = {
        //         id: 1,
        //         balance: 200,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     const mockReceiver = {
        //         id: 2,
        //         balance: 300,
        //         save: jest.fn().mockResolvedValue(true)
        //     };

        //     Customer.findByPk.mockResolvedValueOnce(mockSender);
        //     Customer.findByPk.mockResolvedValueOnce(mockReceiver);
        //     Transaction.create.mockResolvedValueOnce({});

        //     await transfer(req, res);

        //     expect(mockSender.save).toHaveBeenCalled();
        //     expect(mockReceiver.save).toHaveBeenCalled();
        //     expect(Transaction.create).toHaveBeenCalledWith({
        //         customerId: 1,
        //         type: 'transfer',
        //         amount: 100,
        //         receiverId: 2,
        //     });
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Transfer successful',
        //         balance: 100
        //     });
        // });

        // it('should return 404 if receiver not found', async () => {
        //     req.body.amount = 100;
        //     req.body.receiverId = 2;
        //     const mockSender = {
        //         id: 1,
        //         balance: 200,
        //         save: jest.fn().mockResolvedValue(true)
        //     };
        //     Customer.findByPk.mockResolvedValueOnce(mockSender);
        //     Customer.findByPk.mockResolvedValueOnce(null); // Simulate receiver not found

        //     await transfer(req, res);

        //     expect(res.status).toHaveBeenCalledWith(404);
        //     expect(res.json).toHaveBeenCalledWith({
        //         message: 'Receiver not found'
        //     });
        // });
    });


    describe('Withdraw', () => {
        let req, res;

        beforeEach(() => {
            req = {
                body: {},
                user: {
                    id: 1
                },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn(),
                LOCK: {
                    UPDATE: 'UPDATE'
                }
            };
    
            sequelize.transaction = jest.fn().mockResolvedValue(mockTransaction);
        });

        it('return 400 if amount is less than or equal to zero', async () => {
            req.body.amount = 0;

            await withdraw(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Amount number is invalid'
            });
        });

        it('return 404 if customer is not found', async () => {
            req.body.amount = 100;
            Customer.findByPk.mockResolvedValueOnce(null); // Simulate customer not found

            await withdraw(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Customer not found'
            });
        });

        it('return 400 if insufficient balance', async () => {
            req.body.amount = 500;
            const mockCustomer = {
                id: 1,
                balance: 100,
                save: jest.fn().mockResolvedValue(true)
            };
            Customer.findByPk.mockResolvedValueOnce(mockCustomer);

            await withdraw(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Insufficient balance'
            });
        });

        it('should successfully withdraw and update balance11111', async () => {
            req.body.amount = 100;
            const mockCustomer = {
                id: 1,
                balance: 200,
                save: jest.fn().mockResolvedValue(true) // Ensure save is mocked properly
            };
            Customer.findByPk.mockResolvedValueOnce(mockCustomer);
            Transaction.create.mockResolvedValueOnce({}); // Simulate successful transaction
    
            await withdraw(req, res);
    
            // Verify that save is called with the transaction object
            expect(mockCustomer.save).toHaveBeenCalledWith({ transaction: mockTransaction });
            expect(Transaction.create).toHaveBeenCalledWith({
                customerId: mockCustomer.id,
                type: 'withdrawal',
                amount: 100,
            }, { transaction: mockTransaction });
            expect(res.json).toHaveBeenCalledWith({
                message: 'Withdraw money successfully, current balance is 100'
            });
        });

        it('return 500 if an error occurs', async () => {
            req.body.amount = 100;
            const error = new Error('Internal Error');
            Customer.findByPk.mockRejectedValueOnce(error);

            await withdraw(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Internal Server Error'
            });
        });
    });
});