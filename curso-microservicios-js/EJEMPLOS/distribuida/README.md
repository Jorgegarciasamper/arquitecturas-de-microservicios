# Ejemplo: dos microservicios (REST)

1. Terminal A — usuarios:

   ```bash
   cd servicioa && npm install && npm start
   ```

2. Terminal B — pedidos (depende de `http://localhost:3001`):

   ```bash
   cd serviciob && npm install && npm start
   ```

3. Pruebas:

   ```bash
   curl -s http://localhost:3001/users
   curl -s http://localhost:3002/orders
   ```

Variable opcional en `serviciob`: `USERS_URL=http://otro-host:3001`.

**Gateway opcional:** con ambos servicios arriba, puedes usar [gateway_minimo](../gateway_minimo/) en el puerto 4001 (`/api/users`, `/api/orders`).
