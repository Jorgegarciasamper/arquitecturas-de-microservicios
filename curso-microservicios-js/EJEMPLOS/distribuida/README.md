# Ejemplo: dos microservicios por HTTP (REST)

## Objetivo pedagógico

Separar **usuarios** y **pedidos** en **dos procesos** distintos: el servicio de pedidos **depende** del de usuarios mediante una llamada HTTP (`axios`). Así se muestra comunicación **síncrona**, latencia de red y fallos distribuidos frente al monolito.

## Qué necesitas

- Node.js 18+
- Dos terminales (o pestañas)

## Cómo ejecutarlo

**1. Usuarios** (puerto **3001**):

```bash
cd servicioa
npm install
npm start
```

**2. Pedidos** (puerto **3002**) — **solo después** de que `servicioa` esté escuchando:

```bash
cd serviciob
npm install
npm start
```

Opcional: si el servicio de usuarios está en otra máquina o puerto:

```bash
USERS_URL=http://127.0.0.1:3001 npm start
```

(en la carpeta `serviciob`).

## Qué deberías ver

- Consola `servicioa`: `Users service en puerto 3001`
- Consola `serviciob`: `Orders service en puerto 3002`

Pruebas:

```bash
curl -s http://localhost:3001/users
curl -s http://localhost:3001/health
curl -s http://localhost:3002/orders
curl -s http://localhost:3002/health
```

`/orders` debe devolver un pedido cuyo `user` sale de la respuesta de `/users`.

## Qué comprobar

- Arranca **solo** `serviciob` y pide `/orders`: deberías obtener **503** y un cuerpo indicando que `users-service` no está disponible (manejo de error en el código).
- Vuelve a levantar `servicioa` y repite: la respuesta vuelve a ser correcta.

## Dónde poner el foco

- **Orden de arranque** y **URLs fijas** (`localhost:3001`): es el problema que en producción sustituyes por **service discovery**, DNS o un **gateway** ([gateway_minimo](../gateway_minimo/)).
- **Acoplamiento temporal**: `orders` **espera** a `users`; si `users` es lento, el cliente de `orders` nota la lentitud en cadena.

## Conclusiones

Este es el salto mínimo de “monolito mental” a **sistema distribuido**: más autonomía por servicio, pero aparecen **disponibilidad**, **timeouts** y **errores HTTP** que antes no existían en la misma memoria. Conecta con el **módulo 2.1** (comunicación síncrona) y con el **LAB1** del curso.
