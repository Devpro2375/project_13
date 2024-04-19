const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");

// GET all stocks
router.get("/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
