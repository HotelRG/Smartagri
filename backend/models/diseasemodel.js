const  mongoose  = require("mongoose")

const Schema = mongoose.Schema

const diseaseSchema = new Schema({
    crop: {
        type: String,
        required: true
    },
    disease:{
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    }
    
},{ timestamps: true })

module.exports= mongoose.model('Disease', diseaseSchema)
