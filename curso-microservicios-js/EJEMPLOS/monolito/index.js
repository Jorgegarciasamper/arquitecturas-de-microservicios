import express from "express";

const app = express();

const users = [{ id: 1, name: "Ana" }, { id: 2, name: "Luis" }];
const orders = [{ id: 100, userId: 1, total: 59.9 }];

// Endpoints mezclados en la misma app (típico monolito)
app.get("/users", (req, res) => res.json(users));
app.get("/orders", (req, res) => res.json(orders));

app.listen(3000, () => console.log("Servidor monolítico en puerto 3000"));
