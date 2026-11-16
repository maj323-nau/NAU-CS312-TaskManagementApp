const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name FROM users ORDER BY name'
        );

        res.json(result.rows);
    } catch (error) {
        console.error('ASSIGNMENT ERROR:', error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Assign or unassign a task
app.put('/api/tasks/:id/assignment', async (req, res) => {
    const { id } = req.params;
    const { assigned_user_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE tasks
             SET assigned_user_id = $1,
                 updated_at = NOW()
             WHERE id = $2
             RETURNING *`,
            [assigned_user_id ?? null, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update assignment' });
    }
});


app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    due_date,
    priority,
    status,
    assigned_user_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         due_date = COALESCE($3, due_date),
         priority = COALESCE($4, priority),
         status = COALESCE($5, status),
         assigned_user_id = $6,
         updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [
        title ?? null,
        description ?? null,
        due_date ?? null,
        priority ?? null,
        status ?? null,
        assigned_user_id === undefined
          ? (await pool.query(
              'SELECT assigned_user_id FROM tasks WHERE id = $1',
              [id]
            )).rows[0]?.assigned_user_id ?? null
          : assigned_user_id,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});


// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                tasks.*,
                assigned_user.name AS assigned_to,
                creator.name AS created_by_name
            FROM tasks
            LEFT JOIN users AS assigned_user
                ON tasks.assigned_user_id = assigned_user.id
            LEFT JOIN users AS creator
                ON tasks.created_by = creator.id
            ORDER BY tasks.id;
        `);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});