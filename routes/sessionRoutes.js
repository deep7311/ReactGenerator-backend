import express from "express";
import {
  createSession,
  getAllSessions,
  getSingleSession,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.use(protect); // All routes below are protected

router.post("/", createSession);
router.get("/", getAllSessions);
router.get("/:id", getSingleSession);
router.patch("/:id", updateSession);
router.delete("/:id", deleteSession);

export default router;
