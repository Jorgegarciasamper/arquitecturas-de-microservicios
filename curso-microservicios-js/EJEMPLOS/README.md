# Ejemplos del curso (`EJEMPLOS/`)

Código **corto y ejecutable** para apoyar la parte teórica. Cada carpeta es independiente (sus propias dependencias y `package.json`, salvo indicación).

| Carpeta | Módulo / tema | Qué muestra |
|---------|----------------|-------------|
| [monolito](./monolito/) | 1.1, 1.2, LAB1 | Una sola app Express con `/users` y `/orders`. `npm install` · `npm start` |
| [distribuida](./distribuida/) | 1.3, 2.1, LAB1 | Dos procesos: usuarios (3001) y pedidos (3002) con HTTP entre servicios. Ver README interno |
| [service-discovery](./service-discovery/) | 2.2 | Consul en Docker + registro (`servicioA`) + cliente que descubre (`servicioB`) |
| [resiliencia_minima](./resiliencia_minima/) | 2.3, LAB2 | Servicio con fallos aleatorios + cliente con **circuit breaker** (`opossum`) |
| [mensajeria_simple](./mensajeria_simple/) | 3.1, 3.2 | RabbitMQ en Docker + **publicador** y **consumidor** mínimos (`amqplib`) |
| [gateway_minimo](./gateway_minimo/) | 5.1 | API Gateway mínimo con Express + **axios**; encaja con **distribuida** en puertos 3001/3002 |

Los laboratorios completos están en `MODULOS/Modulo*/\*_practica_*.md` (tú generas la carpeta `LABS/` siguiendo el guion).

**Módulos 4 (CQRS / Event Sourcing) y 5.4 (JWT completo)** no tienen carpeta adicional aquí: el flujo guiado está en `4.3_practica_cqrs.md` y `5.4_practica_gateway_jwt.md`.
