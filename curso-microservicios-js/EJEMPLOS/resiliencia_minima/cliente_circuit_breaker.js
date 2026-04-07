import axios from "axios";
import CircuitBreaker from "opossum";

const URL = process.env.SERVICIO_URL || "http://localhost:3010/dato";

async function llamarServicio() {
  const { data } = await axios.get(URL, { timeout: 2000 });
  return data;
}

const breaker = new CircuitBreaker(llamarServicio, {
  timeout: 2500,
  errorThresholdPercentage: 50,
  resetTimeout: 4000,
  volumeThreshold: 5
});

breaker.on("open", () => console.log("\n⚡ Circuito ABIERTO — dejamos de llamar al servicio unos segundos\n"));
breaker.on("halfOpen", () => console.log("\n🔁 Circuito MEDIO ABIERTO — probando de nuevo\n"));
breaker.on("close", () => console.log("\n✅ Circuito CERRADO — flujo normal\n"));

console.log("Cliente con circuit breaker. Objetivo:", URL);
console.log("Ejecutando 25 intentos con pausa breve...\n");

for (let i = 1; i <= 25; i++) {
  try {
    const out = await breaker.fire();
    console.log(`#${i} OK`, JSON.stringify(out));
  } catch (e) {
    console.log(`#${i} error:`, e.response?.status || e.code || e.message);
  }
  await new Promise((r) => setTimeout(r, 200));
}

console.log("\nEstadísticas:", breaker.stats);
