import express from 'express';
import { Kafka } from 'kafkajs';
import http from 'http';
import axios from 'axios';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app = express();
const port = 4060;

// Configure CORS to allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Kafka Configuration
const kafka = new Kafka({
  brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'flightUpdateAlert' });

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const handleSocketConnection = (socket) => {
  console.log('New Socket.IO connection');

  socket.on('disconnect', () => {
    console.log('Socket.IO client disconnected');
  });

  
};

// Function to listen to Kafka messages
const listenToKafka = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'flightUpdate', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
      
      // Broadcast message to Socket.IO clients
      io.emit('flightUpdate', message.value.toString());
    },
  });
};

// Start Kafka listener and HTTP server
listenToKafka().catch(console.error);
app.get('/api/flights', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:6940/allFlights');
    res.json(response.data);
  } catch (error) {
    console.error('Failed to fetch flight data:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle Socket.IO connections
io.on('connection', handleSocketConnection);
