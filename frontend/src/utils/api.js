const API_BASE = 'http://localhost:5000';

export function getToken() {
  return localStorage.getItem('edu2job_token');
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('edu2job_user'));
  } catch {
    return null;
  }
}

export function updateStoredUser(updates) {
  const user = getUser();
  if (user) {
    Object.assign(user, updates);
    localStorage.setItem('edu2job_user', JSON.stringify(user));
  }
}

export function logout() {
  localStorage.removeItem('edu2job_token');
  localStorage.removeItem('edu2job_user');
  localStorage.removeItem('edu2job_predictions');
  window.location.href = '/login';
}

export async function apiPost(endpoint, data) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiGet(endpoint) {
  const token = getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + endpoint, { headers });
  return res.json();
}
