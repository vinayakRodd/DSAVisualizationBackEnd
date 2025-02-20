
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./auth.routes.js");
const connectToMongoDB = require("./connectToMongoDB");
const cors = require('cors');
dotenv.config();

const app = express();

const allowedOrigins = ['https://dsavisualizationfrontend-eccu.onrender.com'];

app.use(cors({
  origin: allowedOrigins, // Allow specific origins
  methods: ['GET', 'POST'], // Allow specific HTTP methods (adjust as needed)
  credentials: true, // If you need to send cookies or authorization headers
}));


// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
