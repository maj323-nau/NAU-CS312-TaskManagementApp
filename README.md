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
- **React**: frontend user interface
- **Node.js**: server runtime

## Planned Features

- **CRUD operations**: create, view, edit, and delete tasks with a title, description, due date, priority, status, and assigned user
- **Filtering and sorting**: filter by status (open, in progress, completed), priority, and due date; sort by due date, priority, and assigned user
- **Collaboration**: assign tasks to team members and track progress and completion status
- **Dashboard analytics**: totals for tasks, completed tasks, overdue tasks, and upcoming deadlines, plus per-user productivity stats
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

## Current Status

**Status: Planning / Not yet started**

- [x] Project proposal completed
- [x] Task responsibilities divided among team members
- [x] Mock-up screens drafted (login/register, main task list, create task, team analytics)
- [x] GitHub repository created
- [ ] Development environment set up
- [ ] Database schema designed
- [ ] Backend API started
- [ ] Frontend started

## Next Steps

1. Every team member clones the repo and confirms they can push and pull
2. Install Node.js and PostgreSQL locally and agree on versions
3. Design the database schema (`users` and `tasks` tables) and save it in `database/`
4. Initialize the Express server in `server/` and the React app in `client/`
5. Agree on API endpoints and a Git workflow (feature branches and pull requests)
6. Decide how to handle authentication and "real-time" updates
7. Begin Phase 1 tasks according to each member's assignments

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
