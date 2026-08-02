require("dotenv").config();

const express = require("express");
const session = require("express-session");

const path = require("path");

const authRoutes = require("./routes/authRoutes");
const chainRoutes = require("./routes/chainRoutes");
const groupRoutes = require("./routes/groupRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const subZoneRoutes = require("./routes/subZoneRoutes");
const brandRoutes = require("./routes/brandRoutes");
const estimateRoutes = require("./routes/estimateRoutes");
const dashboardModel = require("./models/dashboardModel");
const invoiceRoutes = require("./routes/invoiceRoutes");
const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Session Middleware
app.use(session({
    secret: "estimate_management_secret",
    resave: false,
    saveUninitialized: false
}));

// Routes
app.use("/", authRoutes);
app.use("/groups", groupRoutes);
app.use("/chains", chainRoutes);
app.use("/zones", zoneRoutes);
app.use("/subzones", subZoneRoutes);
app.use("/brands", brandRoutes);
app.use("/estimates", estimateRoutes);
app.use("/invoices", invoiceRoutes);
// Home Route
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Dashboard Route
app.get("/dashboard", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    dashboardModel.getDashboardCounts((err, result) => {

        if (err) {
    console.log("Dashboard Error:", err);
    return res.send(err.sqlMessage || err.message);
}

        res.render("dashboard/index", {
            user: req.session.user,
            counts: result[0]
        });

    });

});

// Logout
app.get("/logout", (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.send("Logout Error");
        }

        res.redirect("/login");
    });

});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});