const  mongoose  = require("mongoose")

const Schema = mongoose.Schema

const productSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Price:{
        type: Number,
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

module.exports= mongoose.model('Product', productSchema)
