const estimateModel = require("../models/estimateModel");

// Show Estimates
// Show Estimates
const showEstimates = (req, res) => {

    const search = req.query.search || "";


   estimateModel.getAllEstimates(search, (err, estimates) => {

    if (err) {
        console.log(err);
        return res.send(err.sqlMessage || err.message);
    }

    console.log("Estimates received:");
    console.log(estimates);

    res.render("estimate/index", {
        user: req.session.user,
        estimates,
        search
    });

});

};
// Show Add Estimate Page
const showAddEstimate = (req, res) => {

    estimateModel.getGroups((err, groups) => {

        if (err) return res.send("Database Error");

        estimateModel.getChains((err, chains) => {

            if (err) return res.send("Database Error");

            estimateModel.getZones((err, zones) => {

                if (err) return res.send("Database Error");

                estimateModel.getBrands((err, brands) => {
                    console.log("Brands:", brands);
                    if (err) return res.send("Database Error");

                    res.render("estimate/add", {
                        user: req.session.user,
                        groups,
                        chains,
                        zones,
                        brands
                    });

                });

            });

        });

    });

};

// Add Estimate
const addEstimate = (req, res) => {

  console.log("ADD ESTIMATE API HIT");
    console.log(req.body);
    const {
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
    } = req.body;

console.log("Brand ID:", brand_id);
    estimateModel.addEstimate(
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

        (err, result) => {

            if (err) {

                console.log("MYSQL ERROR:", err);

                return res.send(
                    "MYSQL ERROR: " + err.sqlMessage
                );
            }


            console.log("INSERT SUCCESS:", result);

            res.redirect("/estimates");

        }
    );

};

const showEditEstimate = (req,res)=>{

    const id = req.params.id;


    estimateModel.getEstimateById(id,(err,result)=>{

        if(err){
            console.log(err);
            return res.send("Database Error");
        }


        res.render("estimate/edit",{
            user:req.session.user,
            estimate:result[0]
        });


    });

};

const updateEstimate = (req,res)=>{

    const id = req.params.id;


    const {
        service,
        quantity,
        price_per_unit,
        total_amount,
        expected_delivery,
        delivery_details
    } = req.body;



    estimateModel.updateEstimate(
        id,
        service,
        quantity,
        price_per_unit,
        total_amount,
        expected_delivery,
        delivery_details,

        (err)=>{

            if(err){
                console.log(err);
                return res.send("Database Error");
            }


            res.redirect("/estimates");

        }
    );

};

const deleteEstimate = (req,res)=>{

    const id = req.params.id;


    estimateModel.deleteEstimate(id,(err)=>{

        if(err){

            console.log(err);
            return res.send("Database Error");

        }


        res.redirect("/estimates");

    });

};
module.exports = {

    showEstimates,
    showAddEstimate,
    addEstimate,
    showEditEstimate,
    updateEstimate,
    deleteEstimate

};