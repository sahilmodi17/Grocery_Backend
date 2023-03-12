const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    partner_name :{
        type : String,
        required : [true , "Please provide partner name"],
        trim : true,
        minlength : 3,
    },

    partner_phone : {
        type : String, 
        required : [true , "Please provide partner phone number"],
        length : 10,
    },

    partner_image : {
        type : String,
    }
})


module.exports = mongoose.model("Partner", PartnerSchema);