const groupModel = require("../models/groupModel");

// Show all groups
const showGroups = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    groupModel.getAllGroups((err, groups) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("groups/index", {
            user: req.session.user,
            groups: groups
        });

    });

};

// Show Add Group Page
const showAddGroup = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("groups/add", {
        user: req.session.user
    });

};

// Add Group
const addGroup = (req, res) => {

    const { group_name } = req.body;

    groupModel.addGroup(group_name, (err) => {

        if (err) {
            console.log(err);
            return res.send(err.sqlMessage);
        }

        res.redirect("/groups");

    });

};

// Show Edit Page
const showEditGroup = (req, res) => {

    const id = req.params.id;

    groupModel.getGroupById(id, (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("groups/edit", {
            user: req.session.user,
            group: result[0]
        });

    });

};

// Update Group
const updateGroup = (req, res) => {

    const id = req.params.id;
    const { group_name } = req.body;

    groupModel.updateGroup(id, group_name, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/groups");

    });

};
const deleteGroup = (req, res) => {

    const id = req.params.id;

    groupModel.deleteGroup(id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/groups");

    });

};



module.exports = {
     showGroups,
    showAddGroup,
    addGroup,
    showEditGroup,
    updateGroup,
    deleteGroup
};