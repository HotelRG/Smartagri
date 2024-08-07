const  mongoose  = require("mongoose")

const Schema = mongoose.Schema

const rentalSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Duration:{
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    Category:{
        type: String,
        required: true
    },
    imageurl:{
        type: String
        
    }
},{ timestamps: true })

module.exports= mongoose.model('Rental', rentalSchema)
