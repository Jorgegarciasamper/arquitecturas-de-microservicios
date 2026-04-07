import express from "express";
import axios from "axios";

const app = express();
const PORT = Number(process.env.PORT) || 4001;
const USERS_URL = process.env.USERS_URL || "http://localhost:3001";
const ORDERS_URL = process.env.ORDERS_URL || "http://localhost:3002";

/**
 * Punto de entrada único: el cliente solo conoce este puerto.
 * Requiere `distribuida/servicioa` (3001) y `distribuida/serviciob` (3002) en marcha.
 */
app.get("/api/users", async (req, res) => {
  try {
    const { data } = await axios.get(`${USERS_URL}/users`, { timeout: 5000 });
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: "No se alcanzó users-service", detail: e.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const { data } = await axios.get(`${ORDERS_URL}/orders`, { timeout: 5000 });
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: "No se alcanzó orders-service", detail: e.message });
  }
});

app.get("/health", (req, res) => res.json({ gateway: "up" }));

app.listen(PORT, () => {
  console.log(`Gateway mínimo http://localhost:${PORT} → /api/users, /api/orders`);
});
