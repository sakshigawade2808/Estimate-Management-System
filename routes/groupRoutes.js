const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");

router.get("/", groupController.showGroups);
router.get("/add", groupController.showAddGroup);
router.post("/add", groupController.addGroup);

router.get("/edit/:id", groupController.showEditGroup);
router.post("/edit/:id", groupController.updateGroup);

router.get("/delete/:id", groupController.deleteGroup);
module.exports = router;