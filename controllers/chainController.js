const chainModel = require("../models/chainModel");

// Show Chains
const showChains = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    chainModel.getAllChains((err, chains) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("chains/index", {
            user: req.session.user,
            chains
        });

    });

};

// Show Add Chain Page
const showAddChain = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    chainModel.getGroups((err, groups) => {

        if (err) {
            return res.send("Database Error");
        }

        res.render("chains/add", {
            user: req.session.user,
            groups
        });

    });

};

// Add Chain
const addChain = (req, res) => {

    const { company_name, group_id } = req.body;

    chainModel.addChain(company_name, group_id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/chains");

    });

};



// Show Edit Chain Page
const showEditChain = (req, res) => {

    const id = req.params.id;

    chainModel.getChainById(id, (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        chainModel.getGroups((err, groups) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("chains/edit", {
                user: req.session.user,
                chain: result[0],
                groups: groups
            });

        });

    });

};


// Update Chain
const updateChain = (req, res) => {

    const id = req.params.id;

    const { company_name, group_id } = req.body;

    chainModel.updateChain(id, company_name, group_id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/chains");

    });

};

const deleteChain = (req, res) => {

    const id = req.params.id;

    chainModel.deleteChain(id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/chains");

    });

};
module.exports = {
    showChains,
    showAddChain,
    addChain,
    showEditChain,
    updateChain,
    deleteChain
};