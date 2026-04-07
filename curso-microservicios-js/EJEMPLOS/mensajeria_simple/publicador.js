import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const COLA = "pedidos_demo";

const mensaje = {
  id: Date.now(),
  producto: "Curso microservicios",
  cantidad: 1
};

const conn = await amqp.connect(RABBITMQ_URL);
const ch = await conn.createChannel();
await ch.assertQueue(COLA, { durable: true });
ch.sendToQueue(COLA, Buffer.from(JSON.stringify(mensaje)), { persistent: true });
console.log("📤 Publicado en cola %s:", COLA, mensaje);
await ch.close();
await conn.close();
