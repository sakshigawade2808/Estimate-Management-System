const db = require("../config/db");

const getAllInvoices = (search, callback) => {

    let sql = `
        SELECT
            i.*,
            e.service,
            e.total_amount

        FROM invoices i

        JOIN estimates e
        ON i.estimate_id = e.estimate_id

        WHERE i.status = 1
    `;

    let values = [];

    if (search) {

        sql += `
        AND (
            i.invoice_number LIKE ?
            OR e.service LIKE ?
        )
        `;

        const keyword = `%${search}%`;

        values.push(
            keyword,
            keyword
        );

    }

    db.query(sql, values, callback);

};
const getEstimates = (callback) => {

    const sql = `
        SELECT
            estimate_id,
            service,
            total_amount
        FROM estimates
        WHERE status = 1
    `;

    db.query(sql, callback);

};
const addInvoice = (
    estimate_id,
    invoice_number,
    invoice_date,
    gst,
    discount,
    grand_total,
    callback
) => {

    const sql = `
INSERT INTO invoices
(
    estimate_id,
    invoice_number,
    invoice_date,
    payment_status,
    gst,
    discount,
    grand_total
)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;

   db.query(sql, [
    estimate_id,
    invoice_number,
    invoice_date,
    "Pending",
    gst,
    discount,
    grand_total
], callback);

};

const getInvoiceById = (id, callback) => {

    const sql = `
        SELECT *
        FROM invoices
        WHERE invoice_id = ?
    `;

    db.query(sql, [id], callback);

};

const updateInvoice = (
    id,
    invoice_date,
    gst,
    discount,
    grand_total,
    callback
) => {

    const sql = `
        UPDATE invoices
        SET
            invoice_date = ?,
            gst = ?,
            discount = ?,
            grand_total = ?
        WHERE invoice_id = ?
    `;

    db.query(sql, [
        invoice_date,
        gst,
        discount,
        grand_total,
        id
    ], callback);

};

const deleteInvoice = (id, callback) => {

    const sql = `
        UPDATE invoices
        SET status = 0
        WHERE invoice_id = ?
    `;

    db.query(sql, [id], callback);

};
module.exports = {
    getAllInvoices,
    getEstimates,
    addInvoice,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};