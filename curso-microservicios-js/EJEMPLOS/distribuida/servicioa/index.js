// users-service/index.js
import express from 'express';
const app = express();

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Ana' }]);
});

app.listen(3001, () => console.log('Users service en puerto 3001'));