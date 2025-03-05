```markdown
# Fintech Banking API

A NestJS-based API for a fintech banking mobile application, featuring user authentication, payment processing, notifications, receipts, and reviews. This project uses PostgreSQL as the database and includes Swagger documentation and end-to-end (E2E) tests.

## Project Overview

### Features
- **User Management**: Register users and retrieve profiles.
- **Authentication**: JWT-based login system.
- **Notifications**: Fetch unread notifications for pending payments.
- **Payments**: Checkout, scan-to-pay, and payment processing with QR codes.
- **Receipts**: Generate and retrieve payment receipts.
- **Reviews**: Submit ratings and comments for completed payments.
- **API Documentation**: Interactive Swagger UI.

### Tech Stack
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest
- **Documentation**: Swagger (OpenAPI)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (v15 or higher) installed and running locally
- A PostgreSQL client (e.g., `psql`, pgAdmin) for database setup

## Setup

### 1. Clone the Repository
```bash
git clone <repo-url>
cd fintech-banking
```

### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example `.env` file and customize it:
```bash
cp .env.example .env
```
Edit `.env` with your PostgreSQL credentials:
```
DATABASE_URL=postgres://postgres:your-password@localhost:5432/fintech_banking
JWT_SECRET=your-secret-key
```
- Replace `postgres` with your PostgreSQL username.
- Replace `your-password` with your PostgreSQL password.
- Replace `your-secret-key` with a secure string (e.g., a 32-character random key).

### 4. Set Up PostgreSQL Database
1. Start your local PostgreSQL server (e.g., via `pgAdmin` or system services).
2. Create the database:
   ```bash
   psql -U postgres
   CREATE DATABASE fintech_banking;
   \q
   ```
3. Verify the connection:
   ```bash
   psql -U postgres -d fintech_banking
   ```

### 5. Run the Application
Start the NestJS application:
```bash
npm run start:dev
```
- The app will run on `http://localhost:3000`.
- Access Swagger UI at `http://localhost:3000/api` for API documentation.

## Running Test Cases

### Prerequisites for Testing
- Ensure the PostgreSQL database is running and configured in `.env`.
- Install test dependencies (already included in `npm install`, but verify):
  ```bash
  npm install --save-dev jest supertest @nestjs/testing
  ```

### Test Setup
1. Ensure the app is not running (stop `npm run start:dev` if active).
2. Confirm the database is empty or reset it (optional):
   ```bash
   psql -U postgres -d fintech_banking
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   \q
   ```
   Note: TypeORM’s `synchronize: true` will recreate tables when the app starts.

### Run E2E Tests
Execute all end-to-end tests:
```bash
npm run test:e2e
```
- Tests are located in the `test/` directory:
  - `notification.e2e-spec.ts`: Tests fetching unread notifications.
  - `payment.e2e-spec.ts`: Tests checkout and scan-to-pay flows.
  - `user.e2e-spec.ts`: Tests user registration and profile retrieval.

### Test Details
- **User Tests**: 
  - `POST /users/register`: Creates a user.
  - `GET /users/profile`: Retrieves user profile (requires JWT).
- **Notification Tests**: 
  - `GET /notifications`: Fetches unread notifications (requires JWT).
- **Payment Tests**: 
  - `GET /checkout`: Retrieves checkout details.
  - `POST /checkout/scan`: Initiates scan-to-pay.
- **JWT Requirement**: Protected endpoints need a JWT. Run `/auth/login` manually to get a token:
  ```bash
  curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password"}'
  ```
  Update test files with this token in the `Authorization` header if needed.

### Troubleshooting Tests
- **Database Connection**: If tests fail with connection errors, verify `DATABASE_URL` matches your PostgreSQL setup.
- **JWT Errors**: Ensure `JWT_SECRET` is set correctly in `.env`.
- **Debugging**: Add `console.log(res.body)` in test files to inspect responses.

## API Endpoints
Explore all endpoints via Swagger UI at `http://localhost:3000/api`. Key endpoints include:
- **POST /users/register**: Register a new user (`{ "email": "test@example.com", "password": "password", "name": "Test User" }`).
- **GET /users/profile**: Get user profile (JWT required).
- **POST /auth/login**: Login and get JWT (`{ "email": "test@example.com", "password": "password" }`).
- **GET /notifications**: Get unread notifications (JWT required).
- **GET /checkout**: Get checkout details (JWT required).
- **POST /checkout/scan**: Initiate scan-to-pay (`{ "paymentMethod": "CARD" }`, JWT required).
- **POST /payment/charge**: Process payment (`{ "qrCode": "merchant123" }`, JWT required).
- **GET /receipt**: Get latest receipt (JWT required).
- **POST /review**: Submit a review (`{ "paymentId": "uuid", "rating": 5, "comment": "Great!" }`, JWT required).

## Notes
- **Database Sync**: TypeORM’s `synchronize: true` is enabled for development. Disable it (`synchronize: false`) in production and use migrations.
- **Security**: In production, hash passwords with `bcrypt` and use HTTPS.
- **Swagger UI**: Test APIs interactively with JWT authentication via the "Authorize" button.

## Support
For issues or enhancements, open a GitHub issue or contact the maintainers.
```

---

### Notes on Implementation
1. **No Docker**: This `README.md` assumes a local PostgreSQL installation, removing all Docker-related instructions.
2. **Test Cases**: Instructions cover running E2E tests with Jest, including how to handle JWT authentication manually if tests fail due to missing tokens.
3. **Running the App**: Simple steps to get the app up and running with a local database.

### Steps to Use
1. Replace `<repo-url>` in the `git clone` command with your actual repository URL.
2. Place this `README.md` in the root of your `fintech-banking` directory.
3. Ensure your project matches the structure and dependencies described (e.g., test files, `.env.example`).

Let me know if you need further refinements or additional details!