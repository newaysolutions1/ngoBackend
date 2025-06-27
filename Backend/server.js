const express = require('express');
const cors = require('cors'); // ✅ import cors
const dotenv = require('dotenv');
const http = require('http');
const connectDB = require('./connectDB/db');
const routes = require('./routes/index.routes');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // ✅ allow your React frontend
  credentials: true                // 🔄 optional, only needed if you're using cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'upload')));

connectDB();

app.get('/status', (req, res) => {
  res.send("Server Listening...");
});

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
