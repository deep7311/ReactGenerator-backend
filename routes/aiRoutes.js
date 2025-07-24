import express from "express";
import { generateComponent } from "../controllers/aiController.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post("/generate", protect, generateComponent);

export default router;
