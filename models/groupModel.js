const db = require("../config/db");

// Get all groups
const getAllGroups = (callback) => {

    const sql = `
        SELECT *
        FROM group_management
        WHERE status = 1
        ORDER BY group_id DESC
    `;

    db.query(sql, callback);
};

// Add new group
const addGroup = (group_name, callback) => {

    const sql = `
        INSERT INTO group_management (group_name, status)
        VALUES (?, 1)
    `;

    db.query(sql, [group_name], callback);
};

// Get group by ID
const getGroupById = (id, callback) => {

    const sql = `
        SELECT *
        FROM group_management
        WHERE group_id = ?
    `;

    db.query(sql, [id], callback);
};

// Update group
const updateGroup = (id, group_name, callback) => {

    const sql = `
        UPDATE group_management
        SET group_name = ?
        WHERE group_id = ?
    `;

    db.query(sql, [group_name, id], callback);
};
// Soft Delete Group
const deleteGroup = (id, callback) => {

    const sql = `
        UPDATE group_management
        SET status = 0
        WHERE group_id = ?
    `;

    db.query(sql, [id], callback);
};
module.exports = {
    getAllGroups,
    addGroup,
    getGroupById,
    updateGroup,
    deleteGroup
};