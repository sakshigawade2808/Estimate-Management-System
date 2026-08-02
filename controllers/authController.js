const authModel = require("../models/authModel");

const login = (req, res) => {

    const { email, password } = req.body;

    console.log("Email Entered:", email);

    authModel.getUserByEmail(email, (err, result) => {

        console.log("Error:", err);
        console.log("Database Result:", result);

        if (err) {
            return res.send("Database Error");
        }

        if (result.length === 0) {
            return res.send("Invalid Email");
        }

        const user = result[0];

        console.log("User Found:", user);

        console.log("Entered Password:", password);
console.log("Database Password:", user.password);

if (user.password !== password) {
    console.log("Password does not match");
    return res.send("Invalid Password");
}

console.log("Password matched");

console.log("Session before:", req.session);

req.session.user = user;

console.log("Session after:", req.session);

console.log("Redirecting to dashboard");

res.redirect("/dashboard");
    });
};

module.exports = {
    login
};