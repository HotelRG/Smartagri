const User = require('../models/registermodel');
const jwt = require('jsonwebtoken')
const mongoose =  require('mongoose')
const nodemailer = require('nodemailer')
const  bcrypt = require("bcrypt")

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
    
}
//get all users
const getalluser = async (req,res)=>{
    
    const user = await User.find({}).sort({createdAt:-1})
    
    res.status(200).json(user)
} 

// get user
const getuser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//update user
const updateuser = async (req, res) => {
    const { id } = req.params;
  
    
    const { Password } = req.body;
    if (Password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(Password, salt);
      req.body.Password = hash; // Include the hashed password in the update object
    }
    const { Phone } = req.body;
    if (Phone) {
      if (!validator.isMobilePhone(Phone)) {
        
            return res.status(404).json({ error: "Phone number is not valid" });
          
  
        }
        
    }
  
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(user);
  };
  

//login user
const loginUser= async (req, res) =>{
    const {Email,Password}=req.body
    try{
        const user = await User.login(Email,Password)
        
        //create token
        const token = createToken(user._id)
      
        res.status(200).json({Email,token,Job: user.Job,Address:user.Address})
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
    
}


const forgetpassword = async (req, res) => {

    const { Email } = req.body;
    console.log(Email);
  
    try {
      const user = await User.findOne({ Email: Email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  // Create token
      const token = createToken(user._id);
      // siging in to google
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'zaibgee99@gmail.com',
          pass: 'igftrcnulavfsxgj'
        }
      });
  
      const mailOptions = {
        from: 'zaibgee99@gmail.com',// Send from the user's email
        to: 'faizana22333@gmail.com', // Send to the user's email
        subject: 'Forget Password',
        text: `http://localhost:3000/reset-password/${user._id}/${token}`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Email sending failed" });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json("Email Sent");
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  


//signup user
const signupUser= async (req, res) =>{
    
    const {Username,Email,Password,Phone,Address,Job}=req.body
    try{
        const user = await User.signup(Username,Email,Password,Phone,Address,Job)
        
        //create token
        const token = createToken(user._id)
      
        res.status(200).json({Email,token,Job})
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
   
} 

module.exports = {signupUser,loginUser,getuser,getalluser,updateuser,forgetpassword}