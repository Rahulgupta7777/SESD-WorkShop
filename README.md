# SESD Workshop — Book Management API (TypeScript + Express + Mongoose)

A Book Management service built with TypeScript, Express and Mongoose. It supports create/read/update/delete (CRUD), text search, sorting, and pagination.

## Features
- CRUD for books
- Text search across `title` and `author`
- Sorting by any field (default: `createdAt` desc)
- Pagination with `page` and `limit`

## Tech Stack
- Node.js + TypeScript
- Express 5
- Mongoose 9 (MongoDB)
- dotenv (Environment Variables)

## Project Structure
```
src/
  app.ts              # Express app, routes, DB connect
  server.ts           # App bootstrap
  controllers/
    book.controller.ts
  models/
    book.model.ts
  routes/
    book.route.ts
  schema/
    book.schema.ts
  service/
    book.service.ts
```

## Prerequisites
- Node.js 18+
- typescript ts-node
- dotenv
- MongoDB running locally or a connection string
- `.env` file for configuration

## Setup
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/books
   PORT=8080
   ```

3. **Compile TypeScript**
   ```bash
   npm run build
   ```

4. **Start Server**
   ```bash
   npm start
   or 
   npm run dev
   ```

- Server runs on `http://localhost:8080` (or configured PORT).
- API base path: `/api`.

## Data Model
```ts
// src/schema/book.schema.ts
{
  title: string;        // required
  author: string;       // required
  publishedDate: string;// required
  isbn: string;         // required, unique
  pages: number;        // required
}
```

## Endpoints
Base URL: `http://localhost:8080/api`

### Create Book
- `POST /books`
- Body:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedDate": "1925-04-10",
  "isbn": "9780743273565",
  "pages": 180
}
```
- Responses:
  - `201 Created` → created book
  - `500` → error

### List Books
- `GET /books`
- Query params:
  - `search`: string (matches `title` or `author`, case-insensitive)
  - `sortBy`: field name (e.g. `createdAt`, `title`)
  - `order`: `asc` | `desc`
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
- Response shape:
```json
{
  "data": [ /* books */ ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

### Update Book
- `PUT /books/:id`
- Body: any subset of fields
- Responses:
  - `200 OK` → updated book
  - `404 Not Found` → id missing
  - `500` → error

### Delete Book
- `DELETE /books/:id`
- Responses:
  - `204 No Content` → deleted
  - `404 Not Found` → id missing
  - `500` → error
