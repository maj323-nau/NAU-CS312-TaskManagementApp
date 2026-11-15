# Task Management Application

CS 312 group project at Northern Arizona University.

**Team:** Rique Trujillo Yazzie, Anna Cheatham, Mark Johnson

## What is this project?

A web app where a team can create tasks, assign them to each other, and track progress. We're building it with the PERN stack: **P**ostgreSQL, **E**xpress, **R**eact, **N**ode.

## Lost? Start here

| If you want to... | Look here |
|-------------------|-----------|
| Know what we're building and why | `docs/` (project proposal PDF) |
| See what the screens should look like | `docs/` (mock-ups) |
| Know what to work on next | "What to do next" below |
| Find the database tables | `database/` |
| Find the backend code or the list of API endpoints | `server/` |
| Find the React code | `client/` |
| Still stuck | Ask in the group chat |

## Where things are

```
client/      React frontend (what users see)
server/      Express backend (the API)
database/    SQL files for the database
docs/        Proposal and mock-ups
```

## Where we are right now

- [x] Proposal done
- [x] GitHub repo set up and teammates invited
- [ ] Everyone can clone and push
- [ ] Everyone has Node.js and PostgreSQL installed
- [ ] Database schema written
- [ ] Server set up
- [ ] React app set up

## What to do next

**Everyone first:**
1. Accept the GitHub invite, clone the repo, and push a small test change
2. Install Node.js (LTS) and PostgreSQL, and post your versions in the group chat
3. Create a local database called `taskdb` and make sure you can connect to it

**Then:**

- **Rique (database):** write `database/schema.sql` with a `users` table and a `tasks` table, add some sample data, and tell the group when it's ready to review
- **Anna (tasks / CRUD):** set up the Express server in `server/` with a connection to the database, then build create, view, edit, and delete for tasks
- **Mark (assigning tasks):** set up the React app in `client/` (use Vite), then build assigning tasks to users and updating task status

(Anna and Mark can swap the server and React setup if they want.)

## Decisions we've made

- The page will **refresh the task list after every action** (create, edit, delete, assign, status change). We may add polling later. We are **not** using WebSockets.
- Not working on these yet: Git workflow rules, login/register, filtering and sorting, dashboard.

## Project phases

- **Phase 1:** database, basic task CRUD, assigning tasks, tracking status
- **Phase 2:** connect everything together, add CSS styling, test and fix bugs

Each person's full task list is in the project proposal in `docs/`.

## Versions we're using

Everyone should use the same versions. Fill these in once we agree:

- Node.js: ____
- PostgreSQL: ____
