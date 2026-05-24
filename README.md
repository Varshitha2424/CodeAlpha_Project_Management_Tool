# SaaS Project Management Tool

## Project Overview
The SaaS Project Management Tool is a comprehensive platform designed to streamline project management processes. It offers features such as task management, real-time collaboration, analytics, and notifications, making it ideal for teams of all sizes.

## Architecture Explanation
The application follows a microservices architecture, with the following components:
- **Frontend**: Built with React, it provides an intuitive user interface.
- **Backend**: Node.js with Express handles API requests and business logic.
- **Python Microservices**: Specialized services for analytics, notifications, and task reminders.
- **Database**: MySQL for structured data storage.
- **Socket.IO**: Enables real-time communication.
- **Docker**: Ensures consistent deployment across environments.
- **Nginx**: Acts as a reverse proxy for load balancing.

## Setup Instructions
### Prerequisites
- Docker and Docker Compose installed
- Node.js and npm installed
- Python 3.9+ installed

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Project_Management_Tool
   ```
2. Create `.env` files for all services (refer to `.env.example`).
3. Build and start the services:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - Frontend: `http://localhost`
   - Backend API: `http://localhost:5000/api`

## API Documentation
### Authentication
#### POST `/api/auth/login`
- **Description**: Logs in a user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token"
  }
  ```

#### POST `/api/auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully."
  }
  ```

### Projects
#### GET `/api/projects`
- **Description**: Fetches all projects.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Project Alpha",
      "description": "Description of Project Alpha"
    }
  ]
  ```

#### POST `/api/projects`
- **Description**: Creates a new project.
- **Request Body**:
  ```json
  {
    "name": "Project Beta",
    "description": "Description of Project Beta"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Project created successfully."
  }
  ```

### Tasks
#### GET `/api/tasks`
- **Description**: Fetches all tasks.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Task 1",
      "status": "In Progress"
    }
  ]
  ```

#### POST `/api/tasks`
- **Description**: Creates a new task.
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "projectId": 1
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task created successfully."
  }
  ```

## Database Schema Explanation
The database uses MySQL with the following schema:
- **Users**: Stores user information.
- **Projects**: Stores project details.
- **Tasks**: Stores task details.
- **Comments**: Stores comments on tasks.
- **Notifications**: Stores user notifications.

Refer to `database/schema.sql` for detailed schema definitions.

## Deployment Guide
1. Set up a production environment with Docker and Nginx.
2. Update `.env` files with production values.
3. Build and deploy the Docker containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```
4. Configure Nginx for reverse proxy (refer to `nginx.conf`).
5. Monitor logs and ensure all services are running.

## Future Improvements
- Implement advanced analytics dashboards.
- Add support for third-party integrations (e.g., Slack, Trello).
- Enhance mobile responsiveness.
- Introduce AI-powered task recommendations.
- Optimize database queries for large datasets.

---

For more details, refer to the `docs/` folder.
