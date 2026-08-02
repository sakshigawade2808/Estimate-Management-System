const express = require("express");
const router = express.Router();

const invoiceController = require("../controllers/invoiceController");

// View All Invoices
router.get("/", invoiceController.showInvoices);

// Add Invoice
router.get("/add", invoiceController.showAddInvoice);
router.post("/add", invoiceController.addInvoice);

// Edit Invoice
router.get("/edit/:id", invoiceController.showEditInvoice);
router.post("/edit/:id", invoiceController.updateInvoice);

// Delete Invoice
router.get("/delete/:id", invoiceController.deleteInvoice);

module.exports = router;