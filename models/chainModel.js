const db = require("../config/db");

// Get all active chains with group name
const getAllChains = (callback) => {

   const sql = `
SELECT
    c.chain_id,
    c.company_name,
    c.group_id,
    g.group_name
FROM chains c
JOIN group_management g
ON c.group_id = g.group_id
WHERE c.status = 1
`;
    db.query(sql, callback);
};

// Get all active groups
const getGroups = (callback) => {

    const sql = `
        SELECT group_id, group_name
        FROM group_management
        WHERE status = 1
    `;

    db.query(sql, callback);
};

// Add Chain
const addChain = (company_name, group_id, callback) => {

    const sql = `
        INSERT INTO chains
        (company_name, group_id, status)
        VALUES (?, ?, 1)
    `;

    db.query(sql, [company_name, group_id], callback);
};

// Get chain by ID
const getChainById = (id, callback) => {

    const sql = `
        SELECT *
        FROM chains
        WHERE chain_id = ?
    `;

    db.query(sql, [id], callback);
};

// Update chain
const updateChain = (id, company_name, group_id, callback) => {

    const sql = `
        UPDATE chains
        SET company_name = ?, group_id = ?
        WHERE chain_id = ?
    `;

    db.query(sql, [company_name, group_id, id], callback);
};


const deleteChain = (id, callback) => {

    const sql = `
        UPDATE chains
        SET status = 0
        WHERE chain_id = ?
    `;

    db.query(sql, [id], callback);

};
module.exports = {
    getAllChains,
    getGroups,
    addChain,
    getChainById,
    updateChain,
    deleteChain
};