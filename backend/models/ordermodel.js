const  mongoose  = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id:{
        type: String,
        required: true
    },
    vender_id:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentmethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    imageurl:{
        type: String
        
    }
    
    
    
},{ timestamps: true })

module.exports= mongoose.model('order', orderSchema)
