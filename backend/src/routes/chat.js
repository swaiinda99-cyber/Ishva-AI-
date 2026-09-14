// chat.js — Chat API routes
// TODO: Connect to real AI APIs in a future session
import { Router } from "express";

const router = Router();

// POST /api/chat/send — send a message, get AI response
// TODO: Wire to real AI APIs and Manager AI routing logic
router.post("/send", async (req, res) => {
  const { message, mode, isManagerOn, selectedModelIds } = req.body;
  // Placeholder — real routing logic goes here
  res.json({
    content: "Real AI response coming soon. Currently using mock responses.",
    model: "Manager AI",
    timestamp: new Date(),
  });
});

export default router;
