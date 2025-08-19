import mqtt from 'mqtt';
import { WebSocketServer } from 'ws';

const brokerUrl = 'mqtt://test.mosquitto.org'; // Puedes usar broker local o online
const topic = 'hydroleaf/sensores';

const wss = new WebSocketServer({ port: 3001 });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  ws.on('close', () => clients.delete(ws));
});

const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');
  mqttClient.subscribe(topic);
});

mqttClient.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log('Dato recibido:', data);

  // reenviar por websocket
  clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
});
