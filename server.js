const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const {Server} = require ("socket.io");
const http = require("http");
dotenv.config();
const app = express();
const server = http.createServer(app);
const io= new Server(server);
connectDB();


//specify the frontend origin
// Middleware uses 
app.use(express.json());
app.use(cors({origin :'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"))

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



