# Task Management Application

## Live Link
[Live Demo](https://taskmanagement-ms.web.app)

## Description
This is a Task Management Application that allows users to add, edit, delete, reorder, and categorize tasks. Users can manage tasks under three categories: To-Do, In Progress, and Done, with real-time updates using MongoDB Change Streams or WebSockets. The application includes Firebase Authentication, ensuring that only authenticated users can access it. It features a clean, minimalistic UI, built with Vite.js and React, and fully responsive for both desktop and mobile users.

## Features
- **Authentication**: Google sign-in using Firebase Authentication.
- **Task Management**: Add, edit, delete, reorder tasks across three categories: To-Do, In Progress, and Done.
- **Real-Time Updates**: Changes are synced instantly across devices using MongoDB Change Streams or WebSockets.
- **Responsive Design**: A modern, mobile-friendly design that works seamlessly on desktop and mobile devices.
- **CRUD Operations**: Handle tasks via API endpoints.
- **Optional Features**: Dark mode toggle, task due dates with color indicators, and activity log.

## Technologies Used
- **Frontend**: Vite.js, React, react-beautiful-dnd (or any other drag-and-drop library)
- **Backend**: Express.js, MongoDB, Firebase Authentication
- **Real-Time Sync**: MongoDB Change Streams, WebSockets (or Optimistic UI Updates)

## Dependencies
### Frontend
- `react`
- `react-dom`
- `react-beautiful-dnd` (or other drag-and-drop libraries)
- `firebase`
- `axios` (for API calls)
- `@mui/material` (for UI components)

### Backend
- `express`
- `mongoose`
- `cors`
- `dotenv`
- `firebase-admin` (for Firebase Authentication)
- `socket.io` (if using WebSockets for real-time updates)

## API Endpoints

- **POST /tasks**: Add a new task.
- **GET /tasks**: Retrieve all tasks for the authenticated user.
- **PUT /tasks/:id**: Update task details (title, description, category).
- **DELETE /tasks/:id**: Delete a task.

## Usage

- Upon signing in with Google, users can add, edit, delete, and reorder tasks.
- Tasks can be dragged and dropped across categories and reordered within categories.
- Real-time updates are ensured by syncing changes with the database, using either MongoDB Change Streams or WebSockets.

## Bonus Features

- **Dark Mode Toggle**: Switch between dark and light themes.
- **Task Due Dates**: Tasks have due dates with color indicators (e.g., red for overdue tasks).
- **Activity Log**: Track actions such as "Task moved to Done".
