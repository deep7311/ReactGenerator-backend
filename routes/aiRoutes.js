import express from "express";
import { generateComponent, refineComponent } from "../controllers/aiController.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post("/generate", generateComponent);
router.post("/refine", refineComponent);

export default router;
