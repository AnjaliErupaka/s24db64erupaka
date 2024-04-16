const mongoose = require("mongoose")
const dogschema = mongoose.Schema({
    Dog_Breed: {
        type: String,
        minlength: 1,
        maxlength: 25,
    },

    Dog_Color: String,
    Dog_Name: {
        type: Number,
        min: 1,
        max: 25,
    }
})
module.exports = mongoose.model("dogs",
    dogschema)