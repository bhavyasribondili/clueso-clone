import express from "express";
const router = express.Router();

// In-memory feedback store
const feedbacks = {};

// GET feedback for a product
router.get("/:productId", (req, res) => {
  const { productId } = req.params;
  res.json(feedbacks[productId] || []);
});

// POST add feedback for a product
router.post("/:productId", (req, res) => {
  const { productId } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required" });

  const newFeedback = { text, createdAt: new Date() };

  if (!feedbacks[productId]) feedbacks[productId] = [];
  feedbacks[productId].push(newFeedback);

  res.json(newFeedback);
});

export default router;
