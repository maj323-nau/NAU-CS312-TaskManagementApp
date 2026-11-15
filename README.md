# Task Management Application

**CS 312 Group Project, Northern Arizona University**
School of Informatics, Computing, and Cyber Systems

## Team

| Name | Email | Focus Area |
|------|-------|------------|
| Rique Trujillo Yazzie | rty7@nau.edu | Database design and PostgreSQL integration |
| Anna Cheatham | alc984@nau.edu | Task CRUD operations and frontend integration |
| Mark Johnson | maj323@nau.edu | Task assignment and collaboration features |

## Project Overview

Many individuals and teams struggle to manage tasks and projects efficiently, which leads to missed deadlines and lower productivity. Our project is a web-based task management application that lets users create, organize, prioritize, and track tasks in a collaborative environment.

### Tech Stack (PERN)

- **PostgreSQL**: relational database for tasks and users
- **Express.js**: REST API layer
- **React**: frontend user interface (built with Vite)
- **Node.js**: server runtime

## Planned Features

- **CRUD operations**: create, view, edit, and delete tasks with a title, description, due date, priority, status, and assigned user
- **Collaboration**: assign tasks to team members and track progress and completion status
- **Filtering and sorting**: filter by status, priority, and due date; sort by due date, priority, and assigned user
- **Dashboard analytics**: task totals, completed, overdue, and upcoming deadlines, plus per-user stats
- **User accounts**: login and registration

## Project Phases

### Phase 1: Backend Foundation
- Design the database schema and create the `users` and `tasks` tables
- Define the relationship between users and tasks
- Build basic CRUD operations for tasks
- Implement task assignment and status tracking
- Write database queries to organize, prioritize, and track tasks

### Phase 2: Integration and Polish
- Connect all components to the PostgreSQL database and the website
- Wire CRUD, assignment, and status updates into the React frontend
- Add input validation and error handling
- Apply CSS styling across the site
- Test and debug so all features work together

## Design Decisions

- **Updates:** the app will use **refresh on action** at first: after a user creates, edits, deletes, assigns, or changes the status of a task, the frontend re-fetches the task list. **Polling** (re-fetching on a timer) may be added later once the core features work. We are **not** using WebSockets.
- **Frontend data loading:** the React app loads tasks through a single function (e.g. `fetchTasks()`) so that polling can be added later with minimal changes.

## Requirements

Everyone must use the same major versions. To be confirmed by the team:

| Tool | Version |
|------|---------|
| Node.js | LTS (exact major version TBD) |
| PostgreSQL | TBD |

## Current Status

**Status: Setup complete, development starting**

- [x] Project proposal completed
- [x] Task responsibilities divided among team members
- [x] Mock-up screens drafted (login/register, main task list, create task, team analytics)
- [x] GitHub repository created and folder structure in place
- [x] Collaborator invites sent
- [x] Root README added
- [ ] All teammates have accepted invites and can push
- [ ] Node.js and PostgreSQL versions agreed on
- [ ] Local development environments set up
- [ ] Database schema committed
- [ ] Express server scaffolded
- [ ] React client scaffolded
- [ ] API endpoints agreed on

## First Tasks

Everyone starts with environment setup (see below). After that, each member's first deliverable is:

### Everyone
1. Accept the GitHub invite, clone the repo, and push a small test change
2. Install Node.js (LTS) and PostgreSQL, and post your versions in the group chat
3. Create a local database (same name for everyone, e.g. `taskdb`) and confirm you can connect

### Rique Trujillo Yazzie: Database
1. Write `database/schema.sql` with the `users` table and the `tasks` table (title, description, due date, priority, status, assigned user as a foreign key to `users`)
2. Add seed data so everyone can test against the same rows
3. Write `database/README.md` with setup steps and a short description of the tables
4. Ask Anna and Mark to review the schema before they build on it

### Anna Cheatham: Server and CRUD
1. Scaffold the Express app in `server/` with a health-check route and a PostgreSQL connection (`pg` package), and merge it as soon as it runs
2. Draft the endpoint list (`GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`) in `server/README.md`
3. Build the create and view task routes once the schema is merged, then edit and delete

### Mark Johnson: Client and Assignment
1. Scaffold the React app (Vite) in `client/` and confirm it can call the server's health-check route, then merge it
2. Add an endpoint for assigning a task to a user and one for updating a task's status, and add them to the endpoint list in `server/README.md`
3. Build a basic task list view that shows each task's assigned user and status, loading data through a single `fetchTasks()` function

*Scaffold assignments (server and client) are proposed to spread early work evenly and can be swapped if the team prefers.*

## Next Steps After the First Tasks

1. Finish Phase 1: CRUD routes, assignment, status tracking, and the organizing/prioritizing queries
2. Connect the React frontend to the API and refresh data after every action
3. Begin Phase 2: validation, error handling, CSS styling, testing and debugging
4. Add polling if time allows

## Deferred for Now

These are on the project list but are not being worked on yet: Git workflow rules, authentication (login/register), filtering and sorting, and dashboard analytics.

## Repository Structure

```
.
├── client/      # React frontend
├── server/      # Express and Node.js backend
├── database/    # SQL schema, migrations, seed data
├── docs/        # Proposal, mock-ups, diagrams
└── README.md
```

## Getting Started

Setup instructions will be added as the development environment is finalized.

## Documentation

The project proposal and mock-up screens are in the [`docs/`](docs/) folder.
