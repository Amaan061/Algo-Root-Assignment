# Task Management Frontend

A React-based frontend for the Task Management application built with Vite and Material-UI.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Edit task details
- Responsive design
- Modern Material-UI components

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running on port 5000

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Project Structure

```
src/
  ├── components/
  │   └── TaskList.jsx    # Main task management component
  ├── App.jsx            # Root component
  └── main.jsx          # Application entry point
```

## Technologies Used

- React
- Vite
- Material-UI
- Axios
- CSS-in-JS

## Development

The application uses Vite as the build tool and development server. Any changes to the source files will automatically trigger a hot module replacement (HMR) update in the browser.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.
