const db = require("../config/db");

const getUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
};

module.exports = {
    getUserByEmail
};