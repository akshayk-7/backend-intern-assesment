# Finance Dashboard API

A robust, logically structured backend built to fulfill the Finance Data Processing and Access Control assessment. It features strict Role-Based Access Control (RBAC), relational data modeling, and advanced aggregation endpoints.

## 🚀 Quick Setup (Zero DB Config Required)

For maximum convenience to reviewers, I have configured this project to utilize a live **Neon PostgreSQL cloud database**. You do not need to run Docker or configure a local Postgres instance to review this assignment.

1. Clone the repository.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. In the root of the backend folder, ensure the `.env` file exists with the provided database URL:
   ```
   DATABASE_URL=your_neon_url_here
   PORT=5000
   ```
5. Start the server: `npm start` (or `node server.js`)

> **Note on Local Databases:** If you strictly prefer to test against a local Postgres instance, you can run the provided `database.sql` script to recreate the schema locally.

## 🏛️ Architecture & Clean Design

The project strictly follows the **Controller-Service-Route** layered architecture:
*   **`routes/`**: Handles URL paths and delegates to controllers. Protected heavily by `roleMiddleware`.
*   **`controllers/`**: Extracts HTTP variables (`req.body`, `req.params`) and handles strict Input Validation (400 Bad Request).
*   **`services/`**: Contains complex business logic (e.g., executing multiple simultaneous `Promise.all` database aggregations to maximize speed).
*   **`config/`**: Manages the pooled, SSL-secured database connection.

## 🔒 Security & RBAC (Role Based Access Control)

As permitted by the assessment guidelines, **Mock Authentication** is implemented via HTTP Headers to keep the review process simple.

Pass the header `x-user-role` with your requests:
*   `viewer`: Inherently restricted. Cannot `POST/PUT/DELETE` financial records.
*   `analyst`: Can view records and access deep Dashboard Summary aggregations.
*   `admin`: Full logical access. Can create users, assign roles, manage active/inactive statuses, and manipulate all records.

## 💡 Decisions & Assumptions
*   **Raw SQL over ORM:** To explicitly demonstrate my data modeling and architectural logical thinking, I used the native `pg` driver with parameterized queries (`$1`) instead of hiding logic behind an ORM.
*   **UUIDs:** Used `UUID-v4` for primary keys universally to prevent enumeration scraping.
*   **Database Constraints:** `CHECK` constraints (e.g., ensuring amounts are strictly 'income' or 'expense') and Foreign Key cascades were implemented at the database layer as an infallible mathematical safety net.
