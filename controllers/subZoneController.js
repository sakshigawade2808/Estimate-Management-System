const subZoneModel = require("../models/subZoneModel");


// Show All SubZones
const showSubZones = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    subZoneModel.getAllSubZones((err, subzones) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("subzone/index", {
            user: req.session.user,
            subzones: subzones
        });

    });

};


// Show Add SubZone Page
const showAddSubZone = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    subZoneModel.getZones((err, zones) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("subzone/add", {
            user: req.session.user,
            zones: zones
        });

    });

};


// Add SubZone
const addSubZone = (req, res) => {

    const { subzone_name, zone_id } = req.body;

    subZoneModel.addSubZone(subzone_name, zone_id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/subzones");

    });

};


// Show Edit Page
const showEditSubZone = (req, res) => {

    const id = req.params.id;

    subZoneModel.getSubZoneById(id, (err, subzone) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        subZoneModel.getZones((err, zones) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("subzone/edit", {
                user: req.session.user,
                subzone: subzone[0],
                zones: zones
            });

        });

    });

};


// Update SubZone
const updateSubZone = (req, res) => {

    const id = req.params.id;
    const { subzone_name, zone_id } = req.body;

    subZoneModel.updateSubZone(id, subzone_name, zone_id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/subzones");

    });

};


// Delete SubZone
const deleteSubZone = (req, res) => {

    const id = req.params.id;

    subZoneModel.deleteSubZone(id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/subzones");

    });

};


module.exports = {
    showSubZones,
    showAddSubZone,
    addSubZone,
    showEditSubZone,
    updateSubZone,
    deleteSubZone
};