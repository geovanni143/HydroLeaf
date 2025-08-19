import express from 'express';
import cors from 'cors';
import './mqttClient.js'; // inicia conexión MQTT y WebSocket
import irrigationRoutes from './routes/irrigation.routes.js';

const app = express();
app.use(cors());
app.use(express.json()); // 👈 necesario para leer JSON del body

// Ruta raíz
app.get('/', (req, res) => {
  res.send('HydroLeaf Backend Activo');
});

// 👇 monta rutas de riego
app.use('/api/irrigation', irrigationRoutes);

app.listen(3000, () => {
  console.log('Servidor backend escuchando en puerto 3000');
});
