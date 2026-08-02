const invoiceModel = require("../models/invoiceModel");

// Show All Invoices

// Show All Invoices
const showInvoices = (req, res) => {

    const search = req.query.search || "";

    invoiceModel.getAllInvoices(search, (err, invoices) => {

        if (err) {
            console.log(err);
            return res.send(err.sqlMessage || err.message);
        }

        res.render("invoice/index", {
            user: req.session.user,
            invoices,
            search
        });

    });

};


// Show Add Invoice Page
const showAddInvoice = (req, res) => {

    invoiceModel.getEstimates((err, estimates) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("invoice/add", {
            user: req.session.user,
            estimates
        });

    });

};

// Add Invoice
const addInvoice = (req, res) => {

    const {
        estimate_id,
        invoice_number,
        invoice_date,
        gst,
        discount,
        grand_total
    } = req.body;

    invoiceModel.addInvoice(
        estimate_id,
        invoice_number,
        invoice_date,
        gst,
        discount,
        grand_total,
        (err) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.redirect("/invoices");

        }
    );

};

// Show Edit Invoice
const showEditInvoice = (req, res) => {

    const id = req.params.id;

    invoiceModel.getInvoiceById(id, (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("invoice/edit", {
            user: req.session.user,
            invoice: result[0]
        });

    });

};

// Update Invoice
const updateInvoice = (req, res) => {

    const id = req.params.id;

    const {
        invoice_date,
        gst,
        discount,
        grand_total
    } = req.body;

    invoiceModel.updateInvoice(
        id,
        invoice_date,
        gst,
        discount,
        grand_total,
        (err) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.redirect("/invoices");

        }
    );

};

// Delete Invoice
const deleteInvoice = (req, res) => {

    const id = req.params.id;

    invoiceModel.deleteInvoice(id, (err) => {

        if (err) {
    console.log(err);
    return res.send(err.sqlMessage || err.message);
}

        res.redirect("/invoices");

    });

};

module.exports = {
    showInvoices,
    showAddInvoice,
    addInvoice,
    showEditInvoice,
    updateInvoice,
    deleteInvoice
};