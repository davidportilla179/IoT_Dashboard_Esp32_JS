const express = require('express');
const app = express();
const server= require('http').Server(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});
const PORT = 8080;
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

//mqtt
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.emit('mensaje', 'Bienvenido');
});

client.on('connect', () => {
  client.subscribe('pots', function (err) {
    if (!err) {
      client.publish('node1', 'Server device 1: ESP32 ON');
      console.log('ESP32 ON')
    }
  })
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message);
  console.log(data);
  io.emit('mqtt', data.pot1);
});

server.listen(PORT, function() {
  console.log(`Servidor iniciado en el puerto: http://localhost:${PORT}`);
});
