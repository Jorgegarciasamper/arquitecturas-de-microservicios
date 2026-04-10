import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const AUTH_URL = process.env.AUTH_URL || "http://auth-service:3005";
const ORDERS_URL = process.env.ORDERS_URL || "http://orders-service:3006";
const SECRET = "CLAVE_SUPER_SECRETA";

// Middleware para logging
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.originalUrl}`);
  next();
});

// Ruta de login: se comunica con Auth Service
app.post("/api/login", async (req, res) => {
  try {
    const respuesta = await axios.post(`${AUTH_URL}/login`, req.body);
    res.json(respuesta.data);
  } catch {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

// Middleware de validación de JWT
app.use(async (req, res, next) => {
  if (req.path.startsWith("/api/login")) return next();

  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Falta token" });

  const token = header.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

// Ruteo hacia Orders Service
app.get("/api/pedidos", async (req, res) => {
  try {
    const respuesta = await axios.get(`${ORDERS_URL}/pedidos`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(respuesta.data);
  } catch {
    res.status(500).json({ error: "Error interno del Gateway" });
  }
});

app.listen(4000, () => console.log("🚪 API Gateway escuchando en puerto 4000"));