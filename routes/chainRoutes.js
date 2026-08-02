const express = require("express");
const router = express.Router();

const chainController = require("../controllers/chainController");

// View Chains
router.get("/", chainController.showChains);

// Add Chain
router.get("/add", chainController.showAddChain);
router.post("/add", chainController.addChain);

// Edit Chain
router.get("/edit/:id", chainController.showEditChain);
router.post("/edit/:id", chainController.updateChain);

router.get("/delete/:id", chainController.deleteChain);
module.exports = router;