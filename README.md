# FREETALK APP

## 1. General info and Context

### General
FREETALK is a modular project built on RESTful APIs, designed to manage the creation and interaction of posts and comments.

This project was developed as a portfolio artifact, focusing on the practical application of modern development standards and authentication security.

### Focus on Learning

This project was created as part of the course "The Complete Node.js Backend Developer Bootcamp (2025)".

The main focus of the development was to ensure mastery and correct implementation of the following backend concepts:

* Express Architecture: Use of Middlewares, Modular Routers, and Centralized Error Handling (Catch-All 404 and 500).

* Security: Implementation of secure password hashing and protection against common vulnerabilities (CORS, Session Cookie).

* Typing: Use of TypeScript to ensure data integrity and static code security.

## 2. Tech Stack

Category | Technology | Project Usage |

| --- | --- | --- |
| **Framework** | **NodeJS + Expressjs** | Runtime and backend environment |
| **Language** | **Typescript** | Used to ensure strict typing |
| **Database** | **MongoDB + Mongoose** | NoSQL database + Mongoose for schema definition |
| **Security** | `scrypt` | Slow and robust hashing and salting function for password storage |
| **Session Control** | `cookie-session` | Session management through cookies |
| **Authorization** | **JWT** | User authentication and authorization method |

## 3. Security and Authentication

Credential security is a priority, using the NodeJS crypto module:

| Concept | Implementation | Purpose |
| --- | --- | --- |
| **Hashing** | Asynchronous `scrypt` via `promisify` | Ensures that passwords are never stored in plain text. scrypt is chosen because it is a slow and memory-intensive algorithm, offering high resistance to brute-force attacks. |
| **Salting** | `randomBytes(8)` | A unique 8-byte salt is generated and combined with each password before hashing. The salt is stored along with the hash, preventing Rainbow Table attacks. |
| **Authorization** | **JWT** | Used to create signed tokens that are stored in the session cookie, ensuring that the server can verify the user's identity with each request without querying the database. |
| **Asynchronousness** | `promisify` + `await` | Using `promisify` and `await` in `scrypt` ensures that hashing does not block the Event Loop.