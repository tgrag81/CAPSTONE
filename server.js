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
const mongoose = require('mongoose');

const postRoutes = require('./routes/post');

//to connect to mongoDB like from class

mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser:true,
    useUnifiedTopology: true,

})
.then(() => console.log('MongodDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

//specify the frontend origin
// Middleware uses 
app.use('api/posts', postRoutes);
app.use(express.json());
app.use(cors({origin :'*', //Help queue changes//
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

//fallback attempt
app.options('*', cors());
//preflight response, suggestion from dev tools for error
app.options('/api/posts/create', cors());


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"))

//might have been missing route during help queue
app.post("/api/posts/create", (req, res) => {
const {userID, content, media } =req.body;
res.json({success: true, message: 'Post created', data: {userID, content, media}});

});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



