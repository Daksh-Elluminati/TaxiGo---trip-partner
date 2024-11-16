<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# TaxiGo Backend

## Project Description
The TaxiGo Backend is a modular and scalable backend system for managing a ride-booking application. It includes secure user authentication, role-based authorization, and comprehensive user management. Built with NestJS and MongoDB, it ensures robust performance, security, and easy frontend integration.

## Features
- **Authentication**: JWT-based login system.
- **Authorization**: Role-based access control with custom decorators and guards.
- **User Management**: CRUD operations with data validation and schema enforcement.
- **Database**: MongoDB integration for managing user data and roles.

## Tech Stack
- **Framework**: NestJS (Node.js).
- **Database**: MongoDB (NoSQL).
- **Language**: TypeScript.
- **Authentication**: JSON Web Tokens (JWT).
- **Validation**: Class Validator for data validation.

## Installation and Setup

### Prerequisites
- Node.js installed (v16 or later).
- MongoDB installed or access to a MongoDB cloud instance.
- A code editor (e.g., VSCode) with TypeScript support.
- Postman or similar tools for API testing.

### Steps to Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd taxi-go
   ```

2. **Install Dependencies**:
   Run the following command to install all the necessary dependencies:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taxi-go?retryWrites=true&w=majority
   JWT_SECRET=<your_jwt_secret>
   PORT=3000
   ```
   Replace `<username>`, `<password>`, and `<your_jwt_secret>` with your MongoDB credentials and a secure JWT secret key.

4. **Run the Application**:
   Start the server with:
   ```bash
   npm run start
   ```
   The server will run on the specified port (default: `3000`).

5. **Test the APIs**:
   - Use Postman or similar tools to test the API endpoints.
   - Example:
     - **Login**: `POST /auth/login`
     - **Get Profile**: `GET /auth/profile`
     - **Create User**: `POST /user`

## API Documentation

### Authentication Endpoints
1. **Login**:
   - **Endpoint**: `POST /auth/login`
   - **Body**:
     ```json
     {
       "userEmail": "user@example.com",
       "userPassword": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "access_token": "jwt_token"
     }
     ```

2. **Get Profile**:
   - **Endpoint**: `GET /auth/profile`
   - **Headers**:
     - `Authorization`: `Bearer <jwt_token>`

### User Management Endpoints
1. **Create User**:
   - **Endpoint**: `POST /user`
   - **Body**:
     ```json
     {
       "userName": "John Doe",
       "userEmail": "john.doe@example.com",
       "userPhone": "1234567890",
       "userPassword": "StrongPassword123",
       "userRoles": "user"
     }
     ```

2. **Get All Users**:
   - **Endpoint**: `GET /user`

3. **Update User**:
   - **Endpoint**: `PATCH /user/:id`
   - **Body**:
     ```json
     {
       "userName": "Updated Name"
     }
     ```

4. **Delete User**:
   - **Endpoint**: `DELETE /user/:id`

## Running Tests
Run unit tests to ensure functionality:
```bash
npm run test
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
