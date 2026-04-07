import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3010;

/**
 * Simula un microservicio poco fiable: ~60% de respuestas fallan.
 * Úsalo junto con cliente_circuit_breaker.js para ver el patrón circuit breaker.
 */
app.get("/dato", (req, res) => {
  if (Math.random() < 0.6) {
    console.log("  ❌ /dato → 500");
    return res.status(500).json({ error: "Fallo simulado" });
  }
  console.log("  ✅ /dato → ok");
  res.json({ ok: true, valor: 42, momento: new Date().toISOString() });
});

app.get("/health", (req, res) => res.json({ status: "up" }));

app.listen(PORT, () => {
  console.log(`Servicio inestable en http://localhost:${PORT} (GET /dato, /health)`);
});
