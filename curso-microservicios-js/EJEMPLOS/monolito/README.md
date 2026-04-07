# Ejemplo: monolito Express mínimo

## Objetivo pedagógico

Mostrar **un solo proceso** que expone varios recursos de negocio (`/users`, `/orders`) en la misma aplicación: despliegue único, comunicación interna trivial y acoplamiento total en tiempo de ejecución.

## Qué necesitas

- Node.js 18+ (recomendado 20 o 22)
- Terminal en esta carpeta `EJEMPLOS/monolito`

## Cómo ejecutarlo

```bash
npm install
npm start
```

El servidor queda en **http://localhost:3000**.

## Qué deberías ver

En consola:

```text
Servidor monolítico en puerto 3000
```

Con `curl` o el navegador:

```bash
curl -s http://localhost:3000/users
curl -s http://localhost:3000/orders
```

Respuestas JSON con la lista de usuarios y de pedidos.

## Qué comprobar

- Ambas rutas responden **sin** otra aplicación levantada (no hay red entre servicios).
- Un único proceso Node atiende todo; si lo matas, **desaparecen** usuarios y pedidos a la vez.

## Dónde poner el foco

- Contrasta esto con [distribuida](../distribuida/): allí **dos procesos** y una llamada HTTP explícita entre ellos.
- Relación con el temario: **módulo 1** (monolito vs reparto de responsabilidades).

## Conclusiones

El monolito es válido para empezar y para dominios pequeños; el “coste” aparece cuando quieres **escalar o desplegar por partes**: cualquier cambio afecta al **mismo artefacto** y al mismo ciclo de vida que el resto de rutas.
