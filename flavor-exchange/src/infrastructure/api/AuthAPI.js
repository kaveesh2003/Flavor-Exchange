const API_BASE_URL = 'http://localhost:3001'; // Default json-server port

class AuthApiJsonServer {
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/users?email=${credentials.email}&password=${credentials.password}`);
      if (!response.ok) {
        const error = await response.json();
        return Promise.reject(error.message || 'Login failed');
      }
      const users = await response.json();
      if (users.length === 1) {
        return { data: { ...users[0] } };
      } else {
        return Promise.reject({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return Promise.reject(error.message || 'Network error during login');
    }
  }

  async register(registrationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...registrationData, token: `mock_token_${Date.now()}` }),
      });
      if (!response.ok) {
        const error = await response.json();
        return Promise.reject(error.message || 'Registration failed');
      }
      const newUser = await response.json();
      return { data: { message: 'Registration successful!', user: newUser } };
    } catch (error) {
      return Promise.reject(error.message || 'Network error during registration');
    }
  }

  async validateToken(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/users?token=${token}`);
      if (!response.ok) {
        const error = await response.json();
        return Promise.reject(error.message || 'Invalid token');
      }
      const users = await response.json();
      if (users.length === 1) {
        return { data: { id: users[0].id, username: users[0].username, email: users[0].email } };
      } else {
        return Promise.reject({ message: 'Invalid token' });
      }
    } catch (error) {
      return Promise.reject(error.message || 'Network error during token validation');
    }
  }
}

const authApiJsonServer = new AuthApiJsonServer();
export default authApiJsonServer;