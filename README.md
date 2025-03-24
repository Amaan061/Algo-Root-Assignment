# Task Management Application

A full-stack task management application built with Node.js, Express, SQLite, React, and Material-UI.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Edit task details
- Responsive design
- Modern Material-UI components
- SQLite database for data persistence

## Tech Stack

### Backend
- Node.js
- Express
- SQLite3
- MVC Architecture

### Frontend
- React
- Vite
- Material-UI
- Axios

## Project Structure

```
.
├── backend/           # Node.js + Express backend
│   ├── config/       # Database configuration
│   ├── controllers/  # Request handlers
│   ├── models/      # Data models
│   ├── routes/      # API routes
│   └── server.js    # Main server file
└── frontend/         # React frontend
    ├── src/         # Source files
    ├── public/      # Static files
    └── README.md    # Frontend documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

The backend server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

## API Documentation

The backend provides the following RESTful endpoints:

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

### DELETE /tasks/:id
Delete a task.

## Testing the API

### Using Postman
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

### Using cURL

1. Get all tasks:
```bash
curl http://localhost:5000/tasks
```

2. Create a new task:
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task Description"}'
```

3. Update a task:
```bash
curl -X PUT http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated Description","completed":true}'
```

4. Delete a task:
```bash
curl -X DELETE http://localhost:5000/tasks/1
```

## Screenshots

### Main Task List View
![Main Task List](screenshots/main-task-list.png)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 