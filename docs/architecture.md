# System Architecture

## 1. System Overview

This Project Management SaaS platform is designed as a scalable, enterprise-grade solution with separate frontend, backend, database, and Python microservices.

- Frontend: React application for UX, routing, state management, task board, dashboards, and mobile responsiveness.
- Backend: Node.js + Express REST API with JWT authentication, RBAC, MVC pattern, Socket.IO real-time service, and secure middleware.
- Database: MySQL relational schema with normalized tables for users, projects, tasks, comments, notifications, and activity logs.
- Python Services: Dedicated microservices for analytics, notification orchestration, and automation workflows.

## 2. Architecture Diagram

Frontend (React) <--> Backend API (Express) <--> MySQL
                       |
                       +--> Socket.IO
                       |
                       +--> Python Services

### Detailed flow

  [Browser/React]
      |
      | HTTP/HTTPS REST
      V
  [Express API]
      |\
      | \    WebSocket events
      |  \-----------------> [Socket.IO]
      |                     (real-time task updates, comments, alerts)
      |
      +--> [MySQL]        (persistent state)
      |
      +--> [Python Services]
           - Analytics
           - Notifications
           - Automation

## 3. Authentication Flow

1. User submits login credentials.
2. Backend validates credentials and password hash.
3. Backend issues access JWT and refresh token.
4. Frontend stores tokens securely (HttpOnly cookie / in-memory).
5. Protected routes require access token.
6. Backend middleware verifies JWT and loads user role.
7. RBAC middleware enforces permissions for admin, manager, and team member.

### JWT + RBAC sequence

  [Login request] -> [Auth controller] -> [User model] -> [bcrypt compare]
      -> [JWT issue] -> [Frontend storage]
      -> [Protected request] -> [Auth middleware verify]
      -> [RBAC middleware authorize]
      -> [Controller action]

## 4. Real-Time Architecture (Socket.IO)

- Socket server runs alongside Express.
- Clients connect once authenticated with JWT.
- Rooms are organized by `projectId` and `taskId`.
- Events:
  - `task:update`
  - `comment:add`
  - `notification:new`
  - `project:member:invite`
  - `task:status:change`

### Socket flow

  [Client connects] -> [JWT auth handshake] -> [join project room]
      -> [emit task update] -> [server broadcast room]
      -> [other clients receive update]

## 5. Folder Structure

### Frontend

```
frontend/
  public/
  src/
    components/
      atoms/
      molecules/
      organisms/
      templates/
    contexts/
    hooks/
    layouts/
    pages/
    services/
    styles/
    utils/
    App.jsx
    index.jsx
    routes.jsx
```

### Backend

```
backend/
  src/
    config/
      db.config.js
      jwt.config.js
      cors.config.js
    controllers/
      auth.controller.js
      user.controller.js
      project.controller.js
      task.controller.js
      notification.controller.js
      admin.controller.js
    middleware/
      auth.middleware.js
      role.middleware.js
      validation.middleware.js
      error.middleware.js
      rate-limit.middleware.js
    models/
      user.model.js
      project.model.js
      task.model.js
      comment.model.js
      notification.model.js
      activity.model.js
    routes/
      auth.routes.js
      user.routes.js
      project.routes.js
      task.routes.js
      notification.routes.js
      admin.routes.js
      api.routes.js
    services/
      auth.service.js
      email.service.js
      task.service.js
      notification.service.js
      reporting.service.js
    sockets/
      socket.server.js
      project.socket.js
      notification.socket.js
    utils/
      logger.js
      response.util.js
      validator.js
    app.js
    server.js
  migrations/
  seeders/
```

### Python Services

```
python-services/
  analytics/
    analytics_service.py
    requirements.txt
  notifications/
    notification_worker.py
    requirements.txt
  automation/
    automation_task.py
    requirements.txt
```

### Database

```
database/
  schema.sql
  erd.md
  seeds.sql
```

### Docker

```
docker/
  docker-compose.yml
  Dockerfile.frontend
  Dockerfile.backend
  Dockerfile.python
```

## 6. Service Communication

- Frontend uses Axios to call backend REST endpoints.
- Backend uses models to read/write MySQL.
- Socket.IO channels push updates from backend to connected clients.
- Python services consume events or scheduled jobs, optionally via HTTP/webhook or message queue patterns.

## 7. Production Considerations

- Environment config via `.env`
- CORS and rate limiting applied at API layer
- Secure cookies or token refresh pattern for auth
- Logging and error handling centered in middleware
- Database migrations and seeders for repeatable deployments
- Docker Compose for local multi-service orchestration
