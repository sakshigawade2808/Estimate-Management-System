const brandModel = require("../models/brandModel");


// Show Brands
const showBrands = (req,res)=>{

    if(!req.session.user){
        return res.redirect("/login");
    }


    brandModel.getAllBrands((err, brands)=>{

        if(err){
            console.log(err);
            return res.send("Database Error");
        }


        res.render("brand/index",{
            user:req.session.user,
            brands:brands
        });

    });

};



// Show Add Brand
const showAddBrand = (req,res)=>{


    brandModel.getSubZones((err,subzones)=>{

        if(err){
            console.log(err);
            return res.send("Database Error");
        }


        res.render("brand/add",{
            user:req.session.user,
            subzones:subzones
        });

    });


};



// Add Brand
const addBrand=(req,res)=>{

    const {
        brand_name,
        subzone_id
    }=req.body;


    brandModel.addBrand(
        brand_name,
        subzone_id,
        (err)=>{

            if(err){
                console.log(err);
                return res.send("Database Error");
            }


            res.redirect("/brands");

        }
    );

};



// Show Edit Brand
const showEditBrand=(req,res)=>{

    const id=req.params.id;


    brandModel.getBrandById(id,(err,result)=>{


        if(err){
            console.log(err);
            return res.send("Database Error");
        }


        brandModel.getSubZones((err,subzones)=>{


            res.render("brand/edit",{

                user:req.session.user,
                brand:result[0],
                subzones:subzones

            });


        });


    });


};



// Update Brand
const updateBrand=(req,res)=>{


    const id=req.params.id;

    const {
        brand_name,
        subzone_id
    }=req.body;


    brandModel.updateBrand(
        id,
        brand_name,
        subzone_id,
        (err)=>{


            if(err){
                console.log(err);
                return res.send("Database Error");
            }


            res.redirect("/brands");

        }
    );

};



// Delete Brand
const deleteBrand=(req,res)=>{


    const id=req.params.id;


    brandModel.deleteBrand(id,(err)=>{


        if(err){
            console.log(err);
            return res.send("Database Error");
        }


        res.redirect("/brands");


    });


};



module.exports={
    showBrands,
    showAddBrand,
    addBrand,
    showEditBrand,
    updateBrand,
    deleteBrand
};