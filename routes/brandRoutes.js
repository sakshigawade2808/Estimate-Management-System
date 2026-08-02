const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");


// View Brands
router.get("/",brandController.showBrands);


// Add
router.get("/add",brandController.showAddBrand);

router.post("/add",brandController.addBrand);


// Edit
router.get("/edit/:id",brandController.showEditBrand);

router.post("/edit/:id",brandController.updateBrand);


// Delete
router.get("/delete/:id",brandController.deleteBrand);


module.exports = router;