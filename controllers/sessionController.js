import Session from "../models/Session.js";
import mongoose from "mongoose";

// Create new session
export const createSession = async (req, res) => {
  try {
    const { title } = req.body;

    // Check if empty session already exists
    const existingEmptySession = await Session.findOne({
      userId: req.userId,
      "code.jsx": "",
      "code.css": "",
      messages: { $size: 0 },
    });

    if (existingEmptySession) {
      return res.status(200).json({
        success: true,
        message: "Empty chat already exists",
        session: existingEmptySession,
        alreadyExists: true,
      });
    }

    const newSession = new Session({
      userId: req.userId,
      title: title || "Untitled Session",
      messages: [],
      code: {
        jsx: "",
        css: "",
      },
    });

    const saved = await newSession.save();

    res
      .status(201)
      .json({ success: true, message: "Session created", session: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all sessions for logged-in user
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId }).sort({
      updatedAt: -1,
    });
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single session
export const getSingleSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findOne({ _id: id, userId: req.userId });
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update session (messages or code or title)
export const updateSession = async (req, res) => {
  try {
    // console.log("userId from request:", req.userId);
    const { id } = req.params;
    const { title, messages, code } = req.body;

    // console.log("title", title);
    // console.log("messages", messages);
    // console.log("code", code);

    const session = await Session.findOne({ _id: id, userId: req.userId });
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (title !== undefined) session.title = title;
    if (messages !== undefined) session.messages = messages;
    if (code !== undefined) session.code = code;

    const updated = await session.save();

    res
      .status(200)
      .json({ success: true, message: "Session updated", session: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a session
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
