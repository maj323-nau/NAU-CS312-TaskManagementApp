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
| Set up your local database | `docs/Local_Database_Setup_Guide.pdf` |
| Check or fix your Node.js / PostgreSQL versions | "Versions we're using" below |
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
docs/        Proposal, mock-ups, and the database setup guide
```

## Where we are right now

- [x] Proposal done
- [x] GitHub repo set up and teammates invited
- [x] Versions chosen (Node.js 24, PostgreSQL 18)
- [x] Local database setup guide added to `docs/`
- [x] Mark: Node.js 24, PostgreSQL 18, and the `taskdb` database are set up
- [ ] Rique: Node.js 24, PostgreSQL 18, and `taskdb` set up
- [ ] Anna: Node.js 24, PostgreSQL 18, and `taskdb` set up
- [ ] Everyone has cloned the repo
- [ ] Database schema written
- [ ] Server set up
- [ ] React app set up

## What to do next

**Rique and Anna first:**
1. Accept the GitHub invite and clone the repo
2. Follow `docs/Local_Database_Setup_Guide.pdf` to install PostgreSQL 18 and create the `taskdb` database
3. Install Node.js 24 and check your versions (see below)
4. Check the box with your name in "Where we are right now"

**Then:**

- **Rique (database):** write `database/schema.sql` with a `users` table and a `tasks` table, add some sample data, and tell the group when it's ready to review
- **Anna (tasks / CRUD):** set up the Express server in `server/` with a connection to the database, then build create, view, edit, and delete for tasks
- **Mark (assigning tasks):** set up the React app in `client/` (use Vite), then build assigning tasks to users and updating task status

(Anna and Mark can swap the server and React setup if they want.)

## Versions we're using

Everyone should use the same **major** versions so we don't get "it works on my machine" problems.

| Tool | Version |
|------|---------|
| Node.js | 24 (LTS) |
| PostgreSQL | 18 |

Also, everyone's local database should be named `taskdb` and use the default port `5432`.

### How to check your versions

Open a terminal (PowerShell on Windows, Terminal on Mac/Linux) and run:

```
node --version
npm --version
psql --version
```

What you should see:
- `node --version` starts with **v24** (for example `v24.19.0`)
- `psql --version` says **18** (for example `psql (PostgreSQL) 18.1`)
- `npm --version` can be any recent number, it comes with Node

Only the first number matters. `24.19.0` and `24.11.0` are both fine.

### If something is wrong

- **Node version isn't 24:** download the LTS version from nodejs.org, or use a version manager like `nvm` (Mac/Linux) or `nvm-windows` / `fnm` (Windows). Close and reopen your terminal afterward.
- **`node` or `npm` "not recognized":** close and reopen your terminal first. If it still fails, reinstall Node from nodejs.org.
- **`psql` "not recognized" (Windows):** PostgreSQL is probably installed, but its folder isn't on your PATH. The steps to fix it are in `docs/Local_Database_Setup_Guide.pdf` (Step 2).
- **Can't connect to the database:** make sure the PostgreSQL service is running. On Windows, run `Get-Service *postgres*` and look for **Running**. More help is in the setup guide.

If you're on a different version and can't change it, tell the group what you have so we can figure it out together.

## Decisions we've made

- The page will **refresh the task list after every action** (create, edit, delete, assign, status change). We may add polling later. We are **not** using WebSockets.
- Not working on these yet: Git workflow rules, login/register, filtering and sorting, dashboard.

## Project phases

- **Phase 1:** database, basic task CRUD, assigning tasks, tracking status
- **Phase 2:** connect everything together, add CSS styling, test and fix bugs

Each person's full task list is in the project proposal in `docs/`.
