const BASE_URL = 'http://localhost:8080';

export const api = {
  get: async (endpoint) => {
    return request(endpoint, { method: 'GET' });
  },
  post: async (endpoint, data) => {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  put: async (endpoint, data) => {
    return request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (endpoint) => {
    return request(endpoint, { method: 'DELETE' });
  }
};

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }

    // Some endpoints return 204 No Content, check if there's a body
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}
