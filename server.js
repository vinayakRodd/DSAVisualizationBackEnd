
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./auth.routes.js");
const connectToMongoDB = require("./connectToMongoDB");
const cors = require('cors');
dotenv.config();

const app = express();

const allowedOrigins = ['https://algorithmerz.in,algorithmerz.in'];

app.use(cors({
  origin: allowedOrigins, // Allow specific origins
  methods: ['GET', 'POST'], // Allow specific HTTP methods (adjust as needed)
  credentials: true, // If you need to send cookies or authorization headers
}));


// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);

// const bcrypt = require("bcryptjs");
// const User = require("./user.models");
// const generateTokenAndSetCookie = require("./generateToken");

// app.post("/api/auth/signup") = async (req, res) => {
//   try {
//     const { fullName, username, password, confirmPassword, gender } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords don't match" });
//     }

//     const user = await User.findOne({ username });

//     if (user) {
//       return res.status(400).json({ error: "Username already exists" });
//     }

//     // HASH PASSWORD HERE
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // https://avatar-placeholder.iran.liara.run/

//     const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//     const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//     const newUser = new User({
//       fullName,
//       username,
//       password: hashedPassword,
//       gender,
//       profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
//     });

//     if (newUser) {
//       // Generate JWT token here
//       generateTokenAndSetCookie(newUser._id, res);

    
//       await newUser.save();

//       res.status(201).json({
//         _id: newUser._id,
//         fullName: newUser.fullName,
//         username: newUser.username,
//         profilePic: newUser.profilePic,
//       });

      

     
//     } else {
//       res.status(400).json({ error: "Invalid user data" });
//     }
//   } catch (error) {
//     console.log("Error in signup controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// app.post("/api/auth/login") = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    

//     if (!user || !isPasswordCorrect) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     generateTokenAndSetCookie(user._id, res);




//     res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       username: user.username,
//       profilePic: user.profilePic,
//     });


//   } catch (error) {
//     console.log("Error in login controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// app.post("/api/auth/logout") = (req, res) => {
//   try {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.log("Error in logout controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
