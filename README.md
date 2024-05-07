# Basic Auth Project
### Author: Evan Cheng
### Version: 1.0.0
## Overview

This project implements a REST API using Express.js that performs CRUD operations on a PostgreSQL database through Sequelize ORM.The deployed Express server implements Basic Authentication, with signup and signin capabilities, using a Postgres database for storage.

## Design Philosophy

Our API is designed with simplicity and modularity in mind, adhering closely to RESTful standards. The architecture is structured to ensure scalability, maintainability, and a clear separation of concerns between routing, database operations, and error handling.

## Server Initialization

The server is initialized in `src/server.js`, which sets up middleware, routes, and starts the Express application.

## Middleware Modules

Middleware modules are utilized to handle JSON payloads, logging, and Sequelize session transactions. They are initialized in `src/server.js` and configured to ensure smooth operation between requests and database interactions.

## Error Handling Modules

Error handling is critical for gracefully managing and logging issues that arise during API operations. Our implementation includes:

- `404.js`: Handles not found errors when a route is undefined.
- `500.js`: Manages internal server errors and unexpected conditions.

These are located under `src/middleware`.

## UML Diagram

Below is the UML diagram illustrating the architecture and interaction between components of the API:
![UML](./images/client%20server%20authenticate%20login%20UML.png)

## Testing

Testing is conducted using integration tests located in `__tests__/server.test.js` and the `middleware/404.tests.js`, asserting correct responses for each endpoint and proper error handling.

## Deployment

The server is deployed to the cloud. The live API can be accessed at:
[Render URL](postgres://evancheng:oW0au80BHy8ZUsos3GrBQahMJdP4fdfB@dpg-copasr4f7o1s73c8ukk0-a.oregon-postgres.render.com/api_server_db_ek8r)

(postgres://evancheng:oW0au80BHy8ZUsos3GrBQahMJdP4fdfB@dpg-copasr4f7o1s73c8ukk0-a.oregon-postgres.render.com/api_server_db_ek8r)
