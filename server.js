import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // frontend ka URL
  credentials: true, // cookie allow
}));


// Routes
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World My API is running...");
});

app.listen(process.env.PORT, () => {
  // MongoDB
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
