const db = require("../config/db");

const getDashboardCounts = (callback) => {

    const sql = `
        SELECT
        (SELECT COUNT(*) FROM group_management WHERE status = 1) AS totalGroups,

        (SELECT COUNT(*) FROM chains WHERE status = 1) AS totalChains,

        (SELECT COUNT(*) FROM zone_management WHERE status = 1) AS totalZones,

        (SELECT COUNT(*) FROM subzone_management WHERE status = 1) AS totalSubZones,

        (SELECT COUNT(*) FROM brand_management WHERE status = 1) AS totalBrands,

        (SELECT COUNT(*) FROM estimates WHERE status = 1) AS totalEstimates
    `;

    db.query(sql, callback);

};

module.exports = {
    getDashboardCounts
};