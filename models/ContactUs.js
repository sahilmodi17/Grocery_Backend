const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
  contact_email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },

  contact_name : {
    type : String,
    required : [true , "Please Provide name"],
    minlength : 3,
    trim : true,
  },

  issue : {
    type : String,
  }
});

module.exports = mongoose.model("Contact", ContactSchema);