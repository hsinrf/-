// server/api.js
const express = require('express');
const router = express.Router();

// Mock database
const mockDB = {
  users: [
    { id: 1, email: "admin@example.com", username: "admin", role: "admin", lastLogin: "2026-06-03T10:00:00Z" },
    { id: 2, email: "user@example.com", username: "user", role: "user", lastLogin: "2026-06-02T15:30:00Z" }
  ],
  analytics: {
    activeUsers: 42,
    totalRequests: 1250,
    dataSources: 8
  },
  data: [
    { id: 1, name: "Sales Data", type: "csv" },
    { id: 2, name: "User Activity", type: "json" }
  ]
};

// POST /api/auth/login - Authenticate user and issue tokens
router.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockDB.users.find(u => u.email === email);

  if (!user || password !== "password") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Mock token generation
  const accessToken = `access_${Math.random().toString(36).substring(2)}`;
  const refreshToken = `refresh_${Math.random().toString(36).substring(2)}`;

  // Update last login
  user.lastLogin = new Date().toISOString();

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    }
  });
});

// POST /api/auth/refresh - Refresh access token
router.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshToken.startsWith('refresh_')) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  const newAccessToken = `access_${Math.random().toString(36).substring(2)}`;
  res.json({ accessToken: newAccessToken });
});

// GET /api/analytics/data - Retrieve analytical data
router.get('/api/analytics/data', (req, res) => {
  res.json(mockDB.analytics);
});

// GET /api/data/search - Query data with filters
router.get('/api/data/search', (req, res) => {
  const { type, limit = 10, offset = 0 } = req.query;
  let results = [...mockDB.data];

  if (type) {
    results = results.filter(item => item.type === type);
  }

  // Pagination
  results = results.slice(offset, offset + limit);

  res.json({
    total: mockDB.data.length,
    items: results
  });
});

// GET /api/data - List data sources
router.get('/api/data', (req, res) => {
  res.json(mockDB.data);
});

// POST /api/users/assign-role - Assign RBAC roles
router.post('/api/users/assign-role', (req, res) => {
  const { userId, role } = req.body;
  const validRoles = ['admin', 'user', 'guest'];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const user = mockDB.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.role = role;
  res.json({ success: true, user });
});

module.exports = router;