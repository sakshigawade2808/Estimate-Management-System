const express = require("express");
const router = express.Router();

const subZoneController = require("../controllers/subZoneController");

// View SubZones
router.get("/", subZoneController.showSubZones);

// Add SubZone
router.get("/add", subZoneController.showAddSubZone);
router.post("/add", subZoneController.addSubZone);

// Edit SubZone
router.get("/edit/:id", subZoneController.showEditSubZone);
router.post("/edit/:id", subZoneController.updateSubZone);

// Delete SubZone
router.get("/delete/:id", subZoneController.deleteSubZone);

module.exports = router;