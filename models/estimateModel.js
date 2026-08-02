const db = require("../config/db");

// View all estimates
// View all estimates with search
const getAllEstimates = (search, callback) => {

    let sql = `
        SELECT 
            e.*,
            g.group_name,
            c.company_name,
            z.zone_name,
            b.brand_name

        FROM estimates e

        JOIN group_management g 
        ON e.group_id = g.group_id

        JOIN chains c 
        ON e.chain_id = c.chain_id

       JOIN zone_management z
ON e.zone_id = z.zone_id

JOIN brand_management b
ON e.brand_id = b.brand_id

        WHERE e.status = 1
    `;


    let values = [];


    if(search){

        sql += `
        AND (
            e.service LIKE ?
            OR g.group_name LIKE ?
            OR c.company_name LIKE ?
            OR b.brand_name LIKE ?
        )
        `;


        let keyword = `%${search}%`;

        values.push(
            keyword,
            keyword,
            keyword,
            keyword
        );

    }


    db.query(sql, values, callback);

};
// Dropdown data
const getGroups = (callback) => {
    db.query(
        "SELECT group_id, group_name FROM group_management WHERE status = 1",
        callback
    );
};

const getChains = (callback) => {
    db.query(
        "SELECT chain_id, company_name FROM chains WHERE status = 1",
        callback
    );
};

const getZones = (callback) => {

    const sql = `
        SELECT zone_id, zone_name
        FROM zone_management
        WHERE status = 1
    `;

    db.query(sql, callback);

};

const getBrands = (callback) => {

    const sql = `
        SELECT brand_id, brand_name
        FROM brand_management
        WHERE status = 1
    `;

    db.query(sql, callback);

};
const addEstimate = (
    group_id,
    chain_id,
    brand_id,
    zone_id,
    service,
    quantity,
    price_per_unit,
    total_amount,
    expected_delivery,
    delivery_details,
    callback
) => {

    const sql = `
        INSERT INTO estimates
        (
            group_id,
            chain_id,
            brand_id,
            zone_id,
            service,
            quantity,
            price_per_unit,
            total_amount,
            expected_delivery,
            delivery_details
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        group_id,
        chain_id,
        brand_id,
        zone_id,
        service,
        quantity,
        price_per_unit,
        total_amount,
        expected_delivery,
        delivery_details
    ], callback);

};

const getEstimateById = (id,callback)=>{

    const sql = `
        SELECT *
        FROM estimates
        WHERE estimate_id = ?
    `;

    db.query(sql,[id],callback);

};



const updateEstimate = (
    id,
    service,
    quantity,
    price_per_unit,
    total_amount,
    expected_delivery,
    delivery_details,
    callback
)=>{


    const sql = `
        UPDATE estimates
        SET 
        service=?,
        quantity=?,
        price_per_unit=?,
        total_amount=?,
        expected_delivery=?,
        delivery_details=?

        WHERE estimate_id=?
    `;


    db.query(sql,
    [
        service,
        quantity,
        price_per_unit,
        total_amount,
        expected_delivery,
        delivery_details,
        id
    ],
    callback);


};

const deleteEstimate = (id, callback)=>{

    const sql = `
        UPDATE estimates
        SET status = 0
        WHERE estimate_id = ?
    `;

    db.query(sql,[id],callback);

};
module.exports = {
    getAllEstimates,
    getGroups,
    getChains,
    getZones,
    getBrands,
    addEstimate,
    getEstimateById,
    updateEstimate,
    deleteEstimate
};