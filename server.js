import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();
const app = express();



// local testing ke liye hai bas
// aur userController me cookies me secure ko none karna hai
// kyuki ye website ka backend aur fronted dono ek dam alag hai
// aur localhost ke liye usko strict kar skte hai

// mongoose.connect("mongodb://127.0.0.1:27017/JsxGenerator").then(() => {
//   console.log("Connected to Local MongoDB");
//   app.listen(process.env.PORT, () => {
//     console.log(`Server started at Port ${process.env.PORT}`);
//   });
// });


const dbuser = encodeURIComponent(process.env.DB_USER);
const dbpass = encodeURIComponent(process.env.DB_PASS);


mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.th1jcvn.mongodb.net/reactGenerator?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  console.log("Connected to MongoDB Atlas");
  app.listen(process.env.PORT, () => {
    console.log(`Server started at Port ${process.env.PORT}`);
  });
});


app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://react-generator-frontend.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World My API is running...");
});

