# Ejemplo: API Gateway mínimo (Express + axios)

## Objetivo pedagógico

Concentrar el acceso del **cliente** en **un solo puerto** (`4001`): el gateway reenvía a los microservicios internos (`/api/users` → users, `/api/orders` → orders). Así se ilustra el **punto único de entrada** y el **enrutamiento** sin aún meter autenticación JWT (eso es el **laboratorio 5.4**).

## Qué necesitas

- Node.js 18+
- [distribuida](../distribuida/) en marcha: **servicioa** (3001) y **serviciob** (3002)

## Cómo ejecutarlo

**1.** Arranca primero `distribuida` (ver su README).

**2.** Gateway (esta carpeta):

```bash
npm install
npm start
```

Por defecto escucha en **http://localhost:4001**.

Variables opcionales si cambias puertos:

```bash
USERS_URL=http://localhost:3001 ORDERS_URL=http://localhost:3002 PORT=4001 npm start
```

## Qué deberías ver

En consola:

```text
Gateway mínimo http://localhost:4001 → /api/users, /api/orders
```

Pruebas desde el cliente “externo” (solo conoces el gateway):

```bash
curl -s http://localhost:4001/api/users
curl -s http://localhost:4001/api/orders
curl -s http://localhost:4001/health
```

Las dos primeras deben devolver el mismo tipo de JSON que al llamar directamente a 3001 y 3002, pero **sin** que el cliente tenga que saber esos puertos.

## Qué comprobar

- Apaga **solo** `servicioa` y pide `GET /api/users`: el gateway debe responder **502** con detalle útil.
- Apaga **serviciob** y pide `GET /api/orders`: igual, error controlado hacia el cliente del gateway.
- Con todo arriba, las rutas del gateway y las directas a los microservicios deben ser **consistentes**.

## Dónde poner el foco

- **Ocultar la topología interna** al cliente (menos acoplamiento del front o del integrador).
- **Límite del ejemplo**: no hay rate limiting, auth ni TLS; en **5.1** y **5.4** se sube el nivel (JWT, `auth-service`, validación).
- Comparar con invocar **directamente** dos bases URL como en el flujo manual de [distribuida](../distribuida/).

## Conclusiones

El gateway es el sitio natural para **políticas transversales**: autenticación, logs, rutas, versionado de API. Este demo es **mínimo** a propósito para aislar la idea de “**un solo borde HTTP**” antes de complicar con seguridad. Encaja con el **módulo 5.1**.
