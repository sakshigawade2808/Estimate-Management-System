const express = require("express");
const router = express.Router();

const estimateController = require("../controllers/estimateController");


router.get("/", estimateController.showEstimates);


router.get("/add", estimateController.showAddEstimate);

router.post("/add", estimateController.addEstimate);


// Edit
router.get("/edit/:id", estimateController.showEditEstimate);

router.post("/edit/:id", estimateController.updateEstimate);
router.get("/delete/:id", estimateController.deleteEstimate);

module.exports = router;