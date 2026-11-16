
import { useEffect, useState } from 'react';
import {
  getTasks,
  getUsers,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
  unassignTask
} from './client';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const emptyForm = {
    title: '',
    description: '',
    due_date: '',
    priority: 'medium',
    status: 'open'
  };

  const [formData, setFormData] = useState(emptyForm);

  async function loadData() {
    try {
      const [taskData, userData] = await Promise.all([
        getTasks(),
        getUsers()
      ]);

      setTasks(taskData);
      setUsers(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAssign(taskId, userId) {
    try {
      await assignTask(taskId, Number(userId));
      await loadData();
    } catch (error) {
      console.error(error);
      alert('Could not assign task.');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        alert('Task updated successfully!');
      } else {
        await createTask(formData);
        alert('Task created successfully!');
      }

      setFormData(emptyForm);
      setEditingTask(null);

      await loadData();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Could not save task. Check your information.'); 
    }
  }

  function handleEdit(task) {
    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description || '',
      due_date: task.due_date ? task.due_date.slice(0,10) : '',
      priority: task.priority,
      status: task.status
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function handleCancel() {
    setEditingTask(null);
    setFormData(emptyForm);
  }

  async function handleDelete(taskId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmed) return;

    try {
      await deleteTask(taskId);
      await loadData();

      alert('Task deleteed sucessfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Could not delete task.')
    }
  }

  async function handleUnassign(taskId) {
    try {
      await unassignTask(taskId);
      await loadData();
    } catch (error) {
      console.error(error);
      alert('Could not unassign task.');
    }
  }

  if (loading) return <h2>Loading tasks...</h2>;

  return (
    <div className="app">
      <header>
        <h1>Task Management Application</h1>
        <p>Manage and track your team's tasks.</p>
      </header>

      <main>
        {/* Create/Edit Task Form */}
        <section className="task-form-section">
          <h2>
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <form onSubmit={handleSubmit} className="task-form">
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
            />
            <label htmlFor="due_date">Due Date</label>
            <input
              id="due_date"
              name="due_date"
              type="date"
              value={formData.due_date}
              onChange={handleChange}
            />
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="form-buttons">
              <button type="submit">
                {editingTask ? 'Save Changes' : 'Create Task'}
              </button>
              {editingTask && (
                <button type="button" onClick={handleCancel}>Cancel</button>
              )}
            </div>
          </form>
        </section>

        <section className="tasks-section">
          <h2>All Tasks ({tasks.length})</h2>

          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <p>
                  <strong>Due Date:</strong>{' '}
                  {task.due_date
                    ? task.due_date.slice(0,10)
                    : 'No due date'}
                </p>

                <p><strong>Status:</strong> {task.status.replace('_', ' ')}</p>
                <p><strong>Priority:</strong> {task.priority}</p>

                <p>
                  <strong>Assigned To:</strong>{' '}
                  {task.assigned_to || 'Unassigned'}
                </p>

                <div className="assignment-section">
                  <h4>Assign Task</h4>

                  <select
                    value={task.assigned_user_id || ''}
                    onChange={(e) =>
                      handleAssign(task.id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select a user
                    </option>

                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="assignment-section">
                  <h4>Remove Assignment</h4>

                  <button
                    onClick={() => handleUnassign(task.id)}
                    disabled={task.assigned_user_id == null}
                  >
                    Unassign Task
                  </button>
                </div>
                {/* Edit and delete */}
                <div className="task-actions">
                  <button type="button" onClick={() => handleEdit(task)}>
                    Edit Task
                  </button>
                  <button type="button" onClick={() => handleDelete(task.id)}>
                    Delete Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
