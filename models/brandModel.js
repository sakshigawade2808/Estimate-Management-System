const db = require("../config/db");


// Get all active Brands
const getAllBrands = (callback) => {

    const sql = `
        SELECT 
            b.brand_id,
            b.brand_name,
            s.subzone_name
        FROM brand_management b
        JOIN subzone_management s
        ON b.subzone_id = s.subzone_id
        WHERE b.status = 1
    `;

    db.query(sql, callback);

};


// Get active SubZones for dropdown
const getSubZones = (callback) => {

    const sql = `
        SELECT subzone_id, subzone_name
        FROM subzone_management
        WHERE status = 1
    `;

    db.query(sql, callback);

};


// Add Brand
const addBrand = (brand_name, subzone_id, callback) => {

    const sql = `
        INSERT INTO brand_management
        (brand_name, subzone_id)
        VALUES (?,?)
    `;

    db.query(sql, [brand_name, subzone_id], callback);

};


// Get Brand By ID
const getBrandById = (id, callback) => {

    const sql = `
        SELECT *
        FROM brand_management
        WHERE brand_id = ?
    `;

    db.query(sql, [id], callback);

};


// Update Brand
const updateBrand = (id, brand_name, subzone_id, callback) => {

    const sql = `
        UPDATE brand_management
        SET brand_name = ?,
            subzone_id = ?
        WHERE brand_id = ?
    `;

    db.query(sql, [brand_name, subzone_id, id], callback);

};


// Soft Delete Brand
const deleteBrand = (id, callback) => {

    const sql = `
        UPDATE brand_management
        SET status = 0
        WHERE brand_id = ?
    `;

    db.query(sql, [id], callback);

};


module.exports = {
    getAllBrands,
    getSubZones,
    addBrand,
    getBrandById,
    updateBrand,
    deleteBrand
};