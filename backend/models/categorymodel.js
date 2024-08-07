const  mongoose  = require("mongoose")

const Schema = mongoose.Schema

const categorySchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique:true
    },
    Type: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
},{ timestamps: true })

module.exports= mongoose.model('Category', categorySchema)
