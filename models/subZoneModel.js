const db = require("../config/db");

// Get all active SubZones
const getAllSubZones = (callback) => {

    const sql = `
        SELECT
            s.subzone_id,
            s.subzone_name,
            s.zone_id,
            z.zone_name
        FROM subzone_management s
        JOIN zone_management z
        ON s.zone_id = z.zone_id
        WHERE s.status = 1
    `;

    db.query(sql, callback);
};


// Get all active Zones for dropdown
const getZones = (callback) => {

    const sql = `
        SELECT zone_id, zone_name
        FROM zone_management
        WHERE status = 1
    `;

    db.query(sql, callback);
};


// Add SubZone
const addSubZone = (subzone_name, zone_id, callback) => {

    const sql = `
        INSERT INTO subzone_management
        (subzone_name, zone_id)
        VALUES (?, ?)
    `;

    db.query(sql, [subzone_name, zone_id], callback);
};


// Get SubZone by ID
const getSubZoneById = (id, callback) => {

    const sql = `
        SELECT *
        FROM subzone_management
        WHERE subzone_id = ?
    `;

    db.query(sql, [id], callback);
};


// Update SubZone
const updateSubZone = (id, subzone_name, zone_id, callback) => {

    const sql = `
        UPDATE subzone_management
        SET subzone_name = ?, zone_id = ?
        WHERE subzone_id = ?
    `;

    db.query(sql, [subzone_name, zone_id, id], callback);
};


// Soft Delete
const deleteSubZone = (id, callback) => {

    const sql = `
        UPDATE subzone_management
        SET status = 0
        WHERE subzone_id = ?
    `;

    db.query(sql, [id], callback);
};


module.exports = {
    getAllSubZones,
    getZones,
    addSubZone,
    getSubZoneById,
    updateSubZone,
    deleteSubZone
};