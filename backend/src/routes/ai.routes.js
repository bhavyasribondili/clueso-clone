import express from "express";
const router = express.Router();

router.post("/summarize", async (req, res) => {
  const { text } = req.body;
  res.json({
    summary: `This is an AI-generated summary of: ${text.substring(0, 60)}...`,
    source: "fallback",
  });
});

export default router;
