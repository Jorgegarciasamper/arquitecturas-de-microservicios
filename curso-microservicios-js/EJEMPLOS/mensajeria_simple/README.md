# Ejemplo: cola RabbitMQ + publicador / consumidor

## Objetivo pedagógico

Mostrar el flujo mínimo **producir → cola → consumir** sin HTTP entre procesos: desacoplamiento en el **tiempo** (el consumidor no tiene que estar disponible en el instante exacto del envío). Útil antes del laboratorio con *exchanges* y varios servicios (módulo 3 / LAB3).

## Qué necesitas

- Docker (RabbitMQ con imagen oficial)
- Node.js 18+
- Dos terminales (una para el consumidor, otra para publicar)

## Cómo ejecutarlo

**1. Broker** (desde esta carpeta `mensajeria_simple`):

```bash
docker compose up -d
```

- AMQP: **5672**
- Interfaz de gestión (management): **http://localhost:15672** — usuario/contraseña por defecto `guest` / `guest`

**2. Dependencias Node**:

```bash
npm install
```

**3. Consumidor** (déjalo corriendo; escucha la cola `pedidos_demo`):

```bash
npm run consumir
```

**4. Publicador** (en otra terminal; envía **un** mensaje y termina):

```bash
npm run publicar
```

Si Docker mapea otro host/puerto, define:

```bash
export RABBITMQ_URL=amqp://localhost:5672
```

(o la URL que corresponda).

## Qué deberías ver

- **Consumidor**: tras publicar, una línea `✅ Recibido:` con el JSON del pedido de ejemplo.
- **Publicador**: `📤 Publicado en cola pedidos_demo:` y el objeto.
- En la **UI de RabbitMQ**: la cola `pedidos_demo`, mensajes entrantes y acuses (`ack`) al consumir.

## Qué comprobar

- Ejecuta `npm run publicar` **varias veces**: el consumidor debe imprimir un mensaje por cada envío (cola **durable** y mensaje **persistent** en el publicador).
- Para el consumidor (Ctrl+C) y publica de nuevo: al reiniciar el consumidor, si quedaron mensajes en cola, los procesará (comportamiento at-least-once con `ack` correcto).

## Dónde poner el foco

- Comparar con REST: aquí **no** hay “request/response” en la misma petición HTTP; hay **ventana temporal** entre emisión y procesamiento.
- Este ejemplo usa **cola directa** (`sendToQueue` / `consume`); en **3.2** y **LAB3** se introduce el **exchange** y el enrutamiento por clave/topic.

## Conclusiones

La mensajería permite **absorber picos** y desacoplar equipos/servicios, a cambio de **consistencia eventual** y la necesidad de **idempotencia** en consumidores. Es la base de la **EDA** del **módulo 3**.
