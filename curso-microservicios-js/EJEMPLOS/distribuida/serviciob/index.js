// orders-service/index.js
import express from 'express';
import axios from 'axios';

const app = express();
const USERS_URL = process.env.USERS_URL || 'http://localhost:3001';

app.get('/orders', async (req, res) => {
  try {
    const { data: users } = await axios.get(`${USERS_URL}/users`, { timeout: 5000 });
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(502).json({ error: 'Respuesta inválida de users-service' });
    }
    res.json([{ orderId: 100, user: users[0].name, total: 59.9 }]);
  } catch (e) {
    console.error('orders-service:', e.message);
    res.status(503).json({
      error: 'users-service no disponible',
      detail: e.response?.status ? `HTTP ${e.response.status}` : e.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ service: 'orders', status: 'ok' });
});

app.listen(3002, () => console.log('Orders service en puerto 3002'));