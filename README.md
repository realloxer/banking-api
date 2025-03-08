
# Banking API

Restful API built using **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**. 
It supports customer and manager operations with JWT-based authentication.

## Features & Design 

1. Access Control: Customers and managers have distinct permissions using JWT with defined functions `authenticate` and `authenticateManager`.
2. Security: JWT is used to secure endpoints, password hashing ensures user credentials' safety.
3. Data Integrity: Use SQL transactions prevent negative balances.
4. Scalability: Follows RESTful principles for easier extension and maintenance.
5. Database Model: Customers and Transactions are linked using Sequelize associations.
6. Docker Support: Docker Compose ensures easy setup and isolated environments.
7. Testing: Use mocking (jest-mock) to isolate external dependencies so we don't need an actual SQL database.


## Running the Project

1. Install [Docker](https://docs.docker.com/engine/install/) for your machine

2. Set up Docker:

```bash
docker-compose up --build
```

3. The API will be available at:

```
http://localhost:3000
```

4. Use `curl` command or import the `Postman` collection file `api_postman_collection.json` at root folder to run and test all APIs

## Running Tests

Ensure Docker is running and execute:

```bash
docker-compose up --build
docker exec -it bank_api npm test
```

## Future Improvements

- Implement pagination for large transaction lists.
- Improved input validation with a schema validator
- Enhance logging and monitoring.
- Improve security by hashing passwords paramter when login or signup
