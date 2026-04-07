# Ejemplos del curso (`EJEMPLOS/`)

Código **corto y ejecutable** para apoyar la parte teórica. Cada carpeta es independiente (sus propias dependencias y `package.json`, salvo indicación).

**Cada ejemplo incluye un `README.md`** con: cómo ejecutarlo, qué ver en pantalla, qué validar, foco didáctico y conclusiones.

| Carpeta | Guía | Módulo / tema | Qué muestra |
|---------|------|----------------|-------------|
| [monolito](./monolito/) | [README](./monolito/README.md) | 1.1, 1.2, LAB1 | Una sola app Express con `/users` y `/orders` |
| [distribuida](./distribuida/) | [README](./distribuida/README.md) | 1.3, 2.1, LAB1 | Dos procesos HTTP (3001 / 3002) |
| [service-discovery](./service-discovery/) | [README](./service-discovery/README.md) | 2.2 | Consul + registro + cliente |
| [resiliencia_minima](./resiliencia_minima/) | [README](./resiliencia_minima/README.md) | 2.3, LAB2 | Fallos simulados + **opossum** |
| [mensajeria_simple](./mensajeria_simple/) | [README](./mensajeria_simple/README.md) | 3.1, 3.2 | RabbitMQ + publicador / consumidor |
| [gateway_minimo](./gateway_minimo/) | [README](./gateway_minimo/README.md) | 5.1 | Gateway Express → distribuida |

Los laboratorios completos están en `MODULOS/Modulo*/\*_practica_*.md` (tú generas la carpeta `LABS/` siguiendo el guion).

**Módulos 4 (CQRS / Event Sourcing) y 5.4 (JWT completo)** no tienen carpeta adicional aquí: el flujo guiado está en `4.3_practica_cqrs.md` y `5.4_practica_gateway_jwt.md`.
