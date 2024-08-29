const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const http = require('http');
const socketIo = require("socket.io");
const cors = require("cors");
const app = require("./app");

// Create the HTTP server using the Express app
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:3000"
}));

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('socketio', io);

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connection established"))
.catch(() => console.log("Database connection failed"));

const port = 5004;

server.listen(port, () => {
  console.log(`App is running at port ${port}`);
});