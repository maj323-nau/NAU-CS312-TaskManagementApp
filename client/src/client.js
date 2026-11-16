
const API_URL = 'http://localhost:5000/api/tasks';

export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return response.json();
}

export async function getUsers() {
  const response = await fetch('http://localhost:5000/api/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function assignTask(id, userId) {
  return updateTask(id, {
    assigned_user_id: userId
  });
}

export async function unassignTask(id) {
  return updateTask(id, {
    assigned_user_id: null
  });
}
