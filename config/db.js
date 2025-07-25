import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbuser = encodeURIComponent(process.env.DB_USER);
const dbpass = encodeURIComponent(process.env.DB_PASS);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.th1jcvn.mongodb.net/reactGenerator?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
