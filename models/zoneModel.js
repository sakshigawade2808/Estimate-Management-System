const db = require("../config/db");


// Get all active zones
const getAllZones = (callback) => {

    const sql = `
        SELECT 
            z.zone_id,
            z.zone_name,
            z.chain_id,
            c.company_name
        FROM zone_management z
        JOIN chains c
        ON z.chain_id = c.chain_id
        WHERE z.status = 1
    `;

    db.query(sql, callback);
};


// Get all active chains for dropdown
const getChains = (callback) => {

    const sql = `
        SELECT chain_id, company_name
        FROM chains
        WHERE status = 1
    `;

    db.query(sql, callback);
};


// Add Zone
const addZone = (zone_name, chain_id, callback) => {

    const sql = `
        INSERT INTO zone_management
        (zone_name, chain_id)
        VALUES (?, ?)
    `;

    db.query(sql, [zone_name, chain_id], callback);
};


// Get zone by ID
const getZoneById = (id, callback) => {

    const sql = `
        SELECT *
        FROM zone_management
        WHERE zone_id = ?
    `;

    db.query(sql, [id], callback);
};


// Update Zone
const updateZone = (id, zone_name, chain_id, callback) => {

    const sql = `
        UPDATE zone_management
        SET zone_name = ?, chain_id = ?
        WHERE zone_id = ?
    `;

    db.query(sql, [zone_name, chain_id, id], callback);
};


// Delete Zone (Soft Delete)
const deleteZone = (id, callback) => {

    const sql = `
        UPDATE zone_management
        SET status = 0
        WHERE zone_id = ?
    `;

    db.query(sql, [id], callback);
};


module.exports = {
    getAllZones,
    getChains,
    addZone,
    getZoneById,
    updateZone,
    deleteZone
};