function getAuthToken() {
  return localStorage.getItem('psm_token');
}

function getAuthHeaders() {
  const token = getAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request(path, options = {}) {
  const response = await fetch(`${CONFIG.API_URL}${path}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || 'API request failed');
  }
  return data;
}

function setSession(user, token) {
  localStorage.setItem('psm_user', JSON.stringify(user));
  localStorage.setItem('psm_token', token);
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem('psm_user'));
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem('psm_user');
  localStorage.removeItem('psm_token');
}

function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

function fetchCustomers(query) {
  return request(`/customers${query ? `?search=${encodeURIComponent(query)}` : ''}`);
}

function fetchOrders() {
  return request('/orders');
}

function fetchInventory(query) {
  return request(`/inventory${query ? `?search=${encodeURIComponent(query)}` : ''}`);
}

function fetchReports(endpoint) {
  return request(`/reports/${endpoint}`);
}

function fetchInvoicePdfUrl(id) {
  return `${CONFIG.API_URL}/invoices/${id}/pdf`;
}

function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = '/pages/login.html';
  }
  return session;
}

function fetchInvoices() {
  return request('/invoices');
}

window.Api = {
  request,
  login,
  setSession,
  getSession,
  clearSession,
  fetchCustomers,
  fetchOrders,
  fetchInventory,
  fetchInvoices,
  fetchReports,
  fetchInvoicePdfUrl,
  requireAuth
};
