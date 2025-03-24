# Task Management API

A RESTful API for managing tasks built with Node.js, Express, and SQLite, following the MVC (Model-View-Controller) pattern.

## Project Structure

```
backend/
├── config/
│   └── database.js         # Database configuration and setup
├── controllers/
│   └── taskController.js   # Request handlers and business logic
├── models/
│   └── Task.js            # Data model and database operations
├── routes/
│   └── taskRoutes.js      # API route definitions
├── server.js              # Main application file
└── tasks.db              # SQLite database file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

The server will start on port 5000 by default.

## API Endpoints

### GET /tasks
Retrieve all tasks.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "completed": false
  }
]
```

### POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false
}
```

### GET /tasks/:id
Get a specific task by ID.

**Response:**
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false
}
```

### PUT /tasks/:id
Update an existing task.

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true
}
```

### DELETE /tasks/:id
Delete a task.

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

- 400 Bad Request: Invalid input data (e.g., missing title)
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server-side error

## Project Components

### Models (Task.js)
- Handles all database operations
- Implements CRUD operations for tasks
- Uses Promises for asynchronous operations

### Controllers (taskController.js)
- Handles request/response logic
- Implements error handling
- Validates input data
- Calls appropriate model methods

### Routes (taskRoutes.js)
- Defines API endpoints
- Maps routes to controller methods
- Uses Express Router for modular routing

### Config (database.js)
- Sets up SQLite database connection
- Creates necessary tables
- Manages database configuration

## Testing with Postman

Import the following collection into Postman:
```json
{
  "info": {
    "name": "Task Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Tasks",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/tasks"
      }
    },
    {
      "name": "Get Task by ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/tasks/1"
      }
    },
    {
      "name": "Create Task",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/tasks",
        "body": {
          "mode": "raw",
          "raw": "{\"title\":\"Test Task\",\"description\":\"Test Description\"}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        }
      }
    },
    {
      "name": "Update Task",
      "request": {
        "method": "PUT",
        "url": "http://localhost:5000/tasks/1",
        "body": {
          "mode": "raw",
          "raw": "{\"title\":\"Updated Task\",\"description\":\"Updated Description\",\"completed\":true}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        }
      }
    },
    {
      "name": "Delete Task",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:5000/tasks/1"
      }
    }
  ]
}
```

## Development

The application uses:
- Express for the web framework
- SQLite for data storage
- Promises for asynchronous operations
- MVC pattern for code organization

To modify the application:
1. Models: Add/modify database operations in `models/Task.js`
2. Controllers: Update request handling in `controllers/taskController.js`
3. Routes: Modify API endpoints in `routes/taskRoutes.js`
4. Database: Update schema in `config/database.js` 