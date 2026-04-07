# Ejemplo: servicio inestable + circuit breaker (opossum)

## Objetivo pedagógico

Simular un **microservicio poco fiable** (errores 500 aleatorios) y un **cliente** que usa un **circuit breaker** para no martillar al servidor cuando la tasa de fallo es alta: protección del cliente, fallback rápido y recuperación tras un tiempo (estados abrir / medio abrir / cerrar).

## Qué necesitas

- Node.js 18+
- Dos terminales

## Cómo ejecutarlo

**1. Servicio inestable** (puerto **3010** por defecto):

```bash
npm install
npm run servicio
```

**2. Cliente con circuit breaker** (en otra terminal, misma carpeta):

```bash
npm run cliente
```

Opcional — URL del servicio:

```bash
SERVICIO_URL=http://localhost:3010/dato npm run cliente
```

## Qué deberías ver

- En la terminal del **servicio**: mezcla de líneas `✅ /dato → ok` y `❌ /dato → 500`.
- En la terminal del **cliente**: serie de `#N OK` y `#N error: 500`; si la configuración del breaker hace que abra el circuito, aparecen mensajes como **Circuito ABIERTO** / **MEDIO ABIERTO** / **CERRADO** y un bloque **Estadísticas** al final.

## Qué comprobar

- **Sin** `servicio` levantado, el cliente debe fallar con errores de conexión o timeout (según axios/opossum).
- Con el servicio arriba, cuenta **cuántos éxitos y fallos** hay y relaciona con `errorThresholdPercentage` y `volumeThreshold` en `cliente_circuit_breaker.js`.
- Cambia en código el porcentaje de fallo del servidor (`servicio_inestable.js`) y observa cómo cambia el comportamiento del breaker.

## Dónde poner el foco

- **Diferencia entre “reintentar sin límite”** (riesgo de tormenta de peticiones) **y “cortar temporalmente”** las llamadas al proveedor caído.
- Encaje con **timeouts** y **retries** del curso; el laboratorio **2.4** amplía esto con Docker, Axios y RabbitMQ.

## Conclusiones

La resiliencia no es solo “capturar el error”: es **degradar con criterio** y **no amplificar** el fallo. El circuit breaker es un patrón central en microservicios para evitar que una dependencia enferma derrumbe todo el sistema. Encaja con el **módulo 2.3** y prepara el **LAB2**.
