const { registerCustomer, login } = require('../../src/controllers/customer.controller');
const { Customer } = require('../../src/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mockRequest = () => ({ body: {}, query: {} });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

// Mock model and other dependencies
jest.mock('../../src/models');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('Customer Controller', () => {
  describe('RegisterCustomer', () => {
  it('return 400 if customer already exists', async () => {
    // Existing customer
    Customer.findOne.mockResolvedValue({ id: 1 });  

    const req = mockRequest();
    const res = mockResponse();

    // Call the controller function directly
    await registerCustomer(req, res);

    // Assertions: Ensure the correct response is returned
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Customer already exists' });
  });

  it('return 201 if registration is successful', async () => {
    // No existing customer
    Customer.findOne.mockResolvedValue(null);
    // Customer.create successfully
    Customer.create.mockResolvedValue({ id: 1 });

    const req = mockRequest();
    const res = mockResponse();

    await registerCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Registration successful' });
  });
  });

  describe('Login', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        nationalId: '12345',
        password: 'password123',
      },
    };
    res = mockResponse();
  });

  it('return 404 if customer is not found', async () => {
    Customer.findOne.mockResolvedValue(null); 

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
  });

  it('return 401 if password is incorrect', async () => {
    const mockCustomer = {
      id: 1,
      nationalId: '12345',
      password: 'hashedPassword',
    };
    Customer.findOne.mockResolvedValue(mockCustomer); 

    bcrypt.compare.mockResolvedValue(false); // Mock incorrect password

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('return 200 and a token if login is successful', async () => {
    const mockCustomer = {
      id: 1,
      nationalId: '12345',
      password: 'hashedPassword',
    };
    Customer.findOne.mockResolvedValue(mockCustomer);

    bcrypt.compare.mockResolvedValue(true); // Mock correct password
    jwt.sign.mockReturnValue('mockToken');

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      token: 'mockToken',
    });
  });

  it('return 500 if there is a server error', async () => {
    Customer.findOne.mockRejectedValue(new Error('Database Error'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
  });
});
