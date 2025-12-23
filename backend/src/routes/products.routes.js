import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { _id: "1", name: "Product A" },
    { _id: "2", name: "Product B" },
  ]);
});

export default router;
