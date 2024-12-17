const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Database Connection
connectDB();

// Middleware uses 
app.use(express.json());
app.use(cors());

// Routes to use
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//posting routes to use 

app.use("/api/posts", require("./routes/post"));
