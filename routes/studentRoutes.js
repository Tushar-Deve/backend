import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("✅ Student routes working!");
});

export default router;
