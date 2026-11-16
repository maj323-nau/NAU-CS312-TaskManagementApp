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

  const allowedFields = [
    'title',
    'description',
    'due_date',
    'priority',
    'status',
    'assigned_user_id'
  ];

  const updates = [];
  const values = [];

  for (const field of allowedFields) {
    if (Object.hasOwn(req.body, field)) {
        let value = req.body[field];

        if (field === 'due_date' && value === '') value = null;
        if (field === 'description' && value === '') value = null;
        
        values.push(req.body[field]);
        updates.push(`${field} = $${values.length}`);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({
        error: 'No fields provided to update'
    });
  }

  try {
    values.push(id);

    const result = await pool.query(
        `UPDATE tasks
        SET ${updates.join(', ')},
            updated_at = NOW()
        WHERE id = $${values.length}
        RETURNING *`,
        values
    );

    if (result.rows.length === 0){
        return res.status(404).json({
            error: 'Task not found'
        });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update task error:', error);

    res.status(500).json({
        error: 'Failed to update task'
    });
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

// create tasks
app.post('/api/tasks', async (req, res) => {
    const {
        title,
        description,
        due_date,
        priority,
        status,
        assigned_user_id,
        created_by
    } = req.body;

    if (!title || !priority || !status) {
        return res.status(400).json({
            error: 'Title, priority, and status required.'
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO tasks
                (title, description, due_date, priority, status, assigned_user_id, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                title,
                description || null,
                due_date || null,
                priority,
                status,
                assigned_user_id ?? null,
                created_by ?? null
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create taks error:', error);

        res.status(500).json({
            error: 'Failed to create task'
        });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM tasks WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Task not found'
            });
        }

        res.json({
            message: 'Task deleted successfully',
            task: result.rows[0]
        });
    } catch (error) {
        console.error('Delete task error:', error);

        res.status(500).json({
            error: 'Failed to delete task'
        });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});