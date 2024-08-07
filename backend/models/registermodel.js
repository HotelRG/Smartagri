const  mongoose  = require("mongoose")
const  bcrypt = require("bcrypt")
const  validator = require("validator")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    Username:{
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    Job: {
        type: String,
        required: true
    }
},{ timestamps: true })

//static signup method

UserSchema.statics.signup= async function(Username,Email,Password,Phone,Address,Job){

    console.log("signup",Username,Email,Password,Phone,Address)
    //validation
    if(!Email||!Password||!Job)
    {
        throw Error("Email,Job and password are required")
    }
    if(!validator.isEmail(Email))
    {
        throw Error("Email is not valid")
    }
//     if(!validator.isStrongPassword(Password)){
//         throw Error("Password is not strong enough")
//     }
//    if(Phone)
//    {
//     if(!validator.isMobilePhone(Phone))
//     {
//         throw Error("Phone number is not valid")
//     }
//    }
    const exists = await this.findOne({Email})
    
    if(exists) {
        throw Error("Email already in use")
     }

     //hashing with b crypt
     const salt = await bcrypt.genSalt(10)
     const hash = await bcrypt.hash(Password,salt)

     const user = await this.create ({Username,Email,Password : hash,Phone,Address,Job})
     return user

}

// static login method
UserSchema.statics.login= async function(Email,Password){

    //validation
    if(!Email||!Password)
    {
        throw Error("Email and password are required")
    }

    const user = await this.findOne({Email})
    
    if(!user) {
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(Password,user.Password)

    if(!match)
    {
        throw Error("Incorrect Password")
    }
    return user
}

module.exports= mongoose.model('User', UserSchema)
