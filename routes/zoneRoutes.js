const express = require("express");

const router = express.Router();

const zoneController = require("../controllers/zoneController");

// View Zones
router.get("/", zoneController.showZones);


// Add Zone
router.get("/add", zoneController.showAddZone);
router.post("/add", zoneController.addZone);


// Edit Zone
router.get("/edit/:id", zoneController.showEditZone);
router.post("/edit/:id", zoneController.updateZone);


// Delete Zone
router.get("/delete/:id", zoneController.deleteZone);


module.exports = router;