import express from "express";

const router = express.Router();

// Example route — temporary test
router.get("/", (req, res) => {
  res.send("Faculty routes working fine ✅");
});

export default router;
