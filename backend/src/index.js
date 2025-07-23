const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔌 Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// MQTT client (solo como base)
const mqttClient = mqtt.connect(process.env.MQTT_BROKER);
mqttClient.on('connect', () => {
  console.log('📡 Conectado a MQTT Broker');
});

// Ruta base
app.get('/', (req, res) => {
  res.send('HydroLeaf Backend funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
