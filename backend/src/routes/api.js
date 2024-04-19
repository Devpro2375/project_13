const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");

// Fetch all stocks
router.get("/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new stock
router.post("/stocks", async (req, res) => {
  try {
    const { scripname, cmp, entry, stoploss, target } = req.body;
    const newStock = new Stock({
      scripname,
      cmp,
      entry,
      stoploss,
      target,
    });
    const savedStock = await newStock.save();
    res.json(savedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a stock by ID
router.delete("/stocks/:id", async (req, res) => {
  try {
    const stockToDelete = await Stock.findById(req.params.id);
    if (!stockToDelete) {
      return res.status(404).json({ message: "Stock not found" });
    }

    await stockToDelete.deleteOne(); // Or use stockToDelete.remove() followed by await stockToDelete.save()
    res.json({
      message: "Stock deleted successfully",
      deletedStock: stockToDelete,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
