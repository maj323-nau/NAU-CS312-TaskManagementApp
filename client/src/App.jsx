
import { useEffect, useState } from 'react';
import {
  getTasks,
  getUsers,
  assignTask,
  unassignTask
} from './client';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <h2>All Tasks ({tasks.length})</h2>

        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p><strong>Status:</strong> {task.status}</p>
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
