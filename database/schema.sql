-- ============================================================
-- Task Management Application (CS 312)
-- database/schema.sql
--
-- How to run (from the repo root, in PowerShell):
--   psql -U postgres -d taskdb -f database/schema.sql
--
-- WARNING: this file DROPS and recreates the tables, so running it
-- erases any data in them. That's fine while we're developing, and it
-- means everyone can reset their local database to a known state.
-- ============================================================

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

-- ------------------------------------------------------------
-- users: the team members who can be assigned tasks
-- ------------------------------------------------------------
CREATE TABLE users (
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          TEXT        NOT NULL,
    email         TEXT        NOT NULL UNIQUE,
    password_hash TEXT,                        -- empty for now; used when we add login/register
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- tasks: one row per task
--   priority: low | medium | high
--   status:   open | in_progress | completed
-- ------------------------------------------------------------
CREATE TABLE tasks (
    id               INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title            TEXT        NOT NULL,
    description      TEXT,
    due_date         DATE,
    priority         TEXT        NOT NULL DEFAULT 'medium'
                     CHECK (priority IN ('low', 'medium', 'high')),
    status           TEXT        NOT NULL DEFAULT 'open'
                     CHECK (status IN ('open', 'in_progress', 'completed')),
    assigned_user_id INTEGER     REFERENCES users(id) ON DELETE SET NULL,
    created_by       INTEGER     REFERENCES users(id) ON DELETE SET NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for the things we filter and sort by
CREATE INDEX idx_tasks_status        ON tasks (status);
CREATE INDEX idx_tasks_due_date      ON tasks (due_date);
CREATE INDEX idx_tasks_assigned_user ON tasks (assigned_user_id);

-- ------------------------------------------------------------
-- Sample data so everyone can test with the same rows
-- (made-up emails; real accounts come later with login/register)
-- ------------------------------------------------------------
INSERT INTO users (name, email) VALUES
    ('Mark Johnson',          'mark@example.com'),
    ('Anna Cheatham',         'anna@example.com'),
    ('Rique Trujillo Yazzie', 'rique@example.com');

INSERT INTO tasks (title, description, due_date, priority, status, assigned_user_id, created_by) VALUES
    ('Set up database',        'Create the users and tasks tables.',        CURRENT_DATE - 2, 'high',   'completed',   3, 1),
    ('Build task CRUD routes', 'Create, view, edit, and delete endpoints.', CURRENT_DATE + 5, 'high',   'in_progress', 2, 1),
    ('Scaffold React app',     'Create the client with Vite.',              CURRENT_DATE + 3, 'medium', 'in_progress', 1, 1),
    ('Task assignment',        'Let a task be assigned to a team member.',  CURRENT_DATE + 7, 'medium', 'open',        1, 2),
    ('Style the task list',    'Add CSS for the main screen.',              CURRENT_DATE + 14,'low',    'open',        NULL, 2),
    ('Fix overdue example',    'Sample overdue task for dashboard tests.',  CURRENT_DATE - 5, 'medium', 'open',        2, 3);
