const  mongoose  = require("mongoose")

const Schema = mongoose.Schema

const BookingSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    rentalId:{
        type: String,
        required: true
    },
    vender_id:{
        type: String,
        required: true
    },
    fromtime:{
        type: String,
        required: true
    },
    totime:{
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    imgurl:{
        type: String
        
    },
    rentaldate:{
        type: Date,
        required:true
        
    }      

},{ timestamps: true })

module.exports= mongoose.model('Booking', BookingSchema)
