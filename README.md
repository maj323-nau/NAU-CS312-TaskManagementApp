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
| Understand the database tables and why they look the way they do | `docs/Database_Schema_Guide.pdf` |
| See the actual database code | `database/schema.sql` |
| Check or fix your Node.js / PostgreSQL versions | "Versions we're using" below |
| Know what to work on next | "What to do next" below |
| Find the backend code or the list of API endpoints | `server/` |
| Find the React code | `client/` |
| Still stuck | Ask in the group chat |

## Where things are

```
client/      React frontend (what users see)
server/      Express backend (the API)
database/    SQL files for the database (schema.sql)
docs/        Proposal, mock-ups, and our setup/schema guides
```

## Where we are right now

- [x] Proposal done
- [x] GitHub repo set up and teammates invited
- [x] Versions chosen (Node.js 24, PostgreSQL 18)
- [x] Local database setup guide added to `docs/`
- [x] Mark: Node.js 24, PostgreSQL 18, and the `taskdb` database are set up
- [x] First draft of the database schema written (`database/schema.sql`) and tested on Mark's machine
- [x] Schema guide written for the team to review (`docs/Database_Schema_Guide.pdf`)
- [ ] Team reviews the schema and agrees on the status and priority values
- [ ] Rique: Node.js 24, PostgreSQL 18, and `taskdb` set up
- [ ] Anna: Node.js 24, PostgreSQL 18, and `taskdb` set up
- [ ] Everyone has run `schema.sql` on their local database
- [ ] API endpoints agreed on
- [ ] Server set up
- [ ] React app set up

## What to do next

**Everyone, this week:**
1. Skim read `docs/Database_Schema_Guide.pdf` just to understand the Schema.
2. Rique and Anna: clone the repo, follow `docs/Local_Database_Setup_Guide.pdf` to install PostgreSQL 18 and create `taskdb`, and install Node.js 24
3. Once the team agrees on the schema, run it on your own machine:
   ```
   psql -U postgres -d taskdb -f database/schema.sql
   ```
4. Check your box in "Where we are right now"

**Then:**

- **Server and CRUD (Anna):** set up the Express server in `server/` with a connection to the database, then build create, view, edit, and delete for tasks
- **React app:** set up the app in `client/` (use Vite), then build the task list and the assignment and status features
- **Database follow-up:** write the queries to sort, prioritize, and track tasks, and keep the schema file up to date

**Who does what is being finalized.** Mark wrote the first schema draft, and the team is deciding how to split the database work and the assignment/collaboration work. We'll update this section once it's settled. Each person's original task list is in the project proposal in `docs/`.

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
- **`schema.sql` says "No such file or directory":** you're probably not in the repo folder. Use `cd` to go to the folder where you cloned the repo, then run the command again.

If you're on a different version and can't change it, tell the group what you have so we can figure it out together.

## How we change the database

Don't edit tables by hand in psql or pgAdmin. Instead:
1. Edit `database/schema.sql`
2. Rerun it on your machine (this **erases and rebuilds** the tables and puts the sample data back)
3. Commit and push, then tell the group to pull and rerun it

That keeps everyone's database identical.

## Decisions we've made

- The page will **refresh the task list after every action** (create, edit, delete, assign, status change). We may add polling later. We are **not** using WebSockets.
- Not working on these yet: Git workflow rules, login/register, filtering and sorting, dashboard.

## Project phases

- **Phase 1:** database, basic task CRUD, assigning tasks, tracking status
- **Phase 2:** connect everything together, add CSS styling, test and fix bugs
