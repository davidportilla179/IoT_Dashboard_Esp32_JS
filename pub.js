const mqtt = require('mqtt');
const serialport = require('serialport');

const port = new serialport('COM19', {
  baudRate: 9600
});

const parser = port.pipe(new serialport.parsers.Readline({ delimiter: '\n' }));

const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  parser.on('data', (data) => {
    client.publish('display2', data);
  });
});