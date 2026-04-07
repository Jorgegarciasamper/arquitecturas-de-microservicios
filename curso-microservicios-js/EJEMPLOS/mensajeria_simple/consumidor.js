import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const COLA = "pedidos_demo";

const conn = await amqp.connect(RABBITMQ_URL);
const ch = await conn.createChannel();
await ch.assertQueue(COLA, { durable: true });
console.log("📥 Esperando mensajes en %s (Ctrl+C para salir)...", COLA);

ch.consume(
  COLA,
  (msg) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    console.log("✅ Recibido:", data);
    ch.ack(msg);
  },
  { noAck: false }
);
