# Ejemplo: Service Discovery con Consul

## Objetivo pedagógico

Ver **registro** de un microservicio al iniciar y **descubrimiento** por nombre desde un cliente, sin hardcodear IP/puerto definitivos en el consumidor: el cliente pregunta a **Consul** qué instancias hay vivas y llama a una de ellas.

## Qué necesitas

- Docker (para Consul)
- Node.js 18+
- Tres terminales

## Cómo ejecutarlo

**1. Consul** (desde esta carpeta `service-discovery`):

```bash
docker compose up -d
```

Interfaz web habitual: **http://localhost:8500** (según `docker-compose.yaml`).

**2. Servicio que se registra** (`servicioA` — puerto por defecto **3001**):

```bash
cd servicioA
npm install
npm start
```

Deberías ver en consola que el servicio quedó registrado en Consul.

**3. Cliente que descubre y llama** (`servicioB`):

```bash
cd servicioB
npm install
npm start
```

`B` consulta Consul, resuelve la dirección del servicio registrado y hace `GET .../hello`.

## Qué deberías ver

- En **servicioA**: logs de registro en Consul y peticiones `GET /hello` cuando ejecutes `B`.
- En **servicioB**: URL resuelta y el JSON de respuesta del `hello`.
- En la **UI de Consul**: el servicio listado y, si aplica, el health check en estado *passing*.

## Qué comprobar

- Con **solo** Consul y **sin** `servicioA`, al ejecutar `B` debería fallar el descubrimiento o no haber instancias saludables.
- Tras levantar `A`, `B` debe completar la llamada.
- Prueba **SIGINT** en `A` (Ctrl+C): el código hace **deregistro**; vuelve a ejecutar `B` y observa el error (no hay instancia saludable).

## Dónde poner el foco

- Diferencia entre **“sé la URL en el código”** (como en [distribuida](../distribuida/)) y **“pregunto al registro quién soy y dónde estoy”**.
- En Kubernetes u orquestadores modernos el papel de “Consul + agente” está a menudo **integrado** en el plano de servicios, pero la **idea** (nombre lógico → endpoints reales) es la misma.

## Conclusiones

El descubrimiento permite **rotar**, **escalar** y **reemplazar** instancias sin recompilar el cliente por cada cambio de IP. El paquete npm `consul` usado aquí está **deprecated**; sirve como **demostración didáctica**; en producción suele usarse el ecosistema oficial de Hashicorp, Kubernetes Services, etc. Encaja con el **módulo 2.2**.
