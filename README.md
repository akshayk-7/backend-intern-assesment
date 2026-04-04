# Finance Dashboard API

A backend API for a finance dashboard built with Node.js, Express, and PostgreSQL. It handles user management, financial records, and dashboard analytics, with role-based access control built in.

## Setup Instructions

I used a cloud-hosted Neon PostgreSQL database to make testing easy. You don't need to install Postgres or run Docker.

1. Clone the repository.
2. `cd backend`
3. Run `npm install` to install dependencies.
4. Create a `.env` file in the root of the backend folder and add:
   ```
   DATABASE_URL=your_database_url_here
   PORT=5000
   ```
   *(Note: I have provided a live database URL in my submission so you can run the app immediately. If you prefer to test it using a local database, I included a `database.sql` file you can run to set up the tables).*
5. Run `node server.js` to start the server.

## API Endpoints Overview

Swagger documentation is available at: 
Local: http://localhost:5000/api-docs
Deployed: https://finance-dashboard-api-e13h.onrender.com/api-docs
(Swagger UI) after starting the server.

**Users**
*   `POST /api/users` - Create a new user
*   `GET /api/users` - Get all users
*   `PUT /api/users/:id` - Update user role or status (Admin only)

**Financial Records**
*   `GET /api/records` - Get all records (supports `page`, `limit`, and `search` queries)
*   `POST /api/records` - Add a new record
*   `PUT /api/records/:id` - Update an existing record
*   `DELETE /api/records/:id` - Soft delete a record

**Dashboard Summary**
*   `GET /api/analytics/summary` - Gets total income, expenses, net balance, and recent activity

## Role-Based Access Control (RBAC)

To keep things simple, the API uses a mock authentication setup. You just need to pass an `x-user-role` header in your HTTP requests to test the endpoints.

*   `viewer`: Can only read data. Cannot create, edit, or delete records.
*   `analyst`: Can view records and access the dashboard summary data.
*   `admin`: Has full access. Can manage users and edit/delete financial records.

## Features & Notes

*   **Raw SQL**: I used the `pg` package with parameterized queries (`$1`) instead of an ORM to show how I structure database logic.
*   **Swagger Docs**: Available at `/api-docs` so you can quickly test the API without writing Postman requests.
*   **Soft Deletes**: Deleting a record adds a timestamp to `deleted_at`. The GET and Analytics queries are set up to ignore these records to keep totals accurate.
*   **Pagination & Search**: The `GET /api/records` route accepts `limit`, `page`, and `search` parameters to filter records safely.
