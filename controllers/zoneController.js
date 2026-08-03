const zoneModel = require("../models/zoneModel");


// Show all zones
const showZones = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    zoneModel.getAllZones((err, zones) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("zone/index", {
            user: req.session.user,
            zones: zones
        });

    });

};


// Show Add Zone Page
const showAddZone = (req, res) => {

    zoneModel.getChains((err, chains) => {

        if (err) {
            return res.send("Database Error");
        }

        res.render("zone/add", {
            user: req.session.user,
            chains
        });

    });

};


// Add Zone
const addZone = (req, res) => {

    const { zone_name, chain_id } = req.body;


    zoneModel.addZone(zone_name, chain_id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/zones");

    });

};


// Show Edit Zone Page
const showEditZone = (req, res) => {

    const id = req.params.id;


    zoneModel.getZoneById(id, (err, zone) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }


        zoneModel.getChains((err, chains) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }


            res.render("zone/edit", {
                user: req.session.user,
                zone: zone[0],
                chains: chains
            });

        });

    });

};


// Update Zone
const updateZone = (req, res) => {

    const id = req.params.id;

    const { zone_name, chain_id } = req.body;


    zoneModel.updateZone(
        id,
        zone_name,
        chain_id,
        (err) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }


            res.redirect("/zones");

        }
    );

};


// Delete Zone
const deleteZone = (req, res) => {

    const id = req.params.id;


    zoneModel.deleteZone(id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }


        res.redirect("/zones");

    });

};



module.exports = {
    showZones,
    showAddZone,
    addZone,
    showEditZone,
    updateZone,
    deleteZone
};