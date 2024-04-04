const mongoose = require("mongoose")
const dogschema = mongoose.Schema({
    Dog_Breed: String,
    Dog_Color: String,
    Dog_Name: Number
})
module.exports = mongoose.model("dogs",
dogschema)