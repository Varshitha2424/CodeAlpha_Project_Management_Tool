# Database ER Diagram Explanation

## Entities

- `users`
  - Stores all account information and RBAC roles.

- `teams`
  - Group workspace for projects and members.

- `projects`
  - Project containers within teams.

- `project_members`
  - Join table linking users to projects with a project-specific role.

- `tasks`
  - Kanban tasks assigned to users and linked to projects.

- `comments`
  - Task-level discussion history.

- `attachments`
  - Files attached to tasks.

- `notifications`
  - In-app notification records.

- `refresh_tokens`
  - Persistent refresh tokens for secure session renewal.

- `activity_logs`
  - Audit trail for project and task activity.

## Relationships

- `users` 1:N `teams` (owner relationship)
- `teams` 1:N `projects`
- `projects` 1:N `tasks`
- `projects` 1:N `project_members`
- `tasks` 1:N `comments`
- `tasks` 1:N `attachments`
- `users` 1:N `notifications`
- `users` 1:N `activity_logs`
