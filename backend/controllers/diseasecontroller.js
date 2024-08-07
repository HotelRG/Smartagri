const Disease = require('../models/diseasemodel')
const mongoose =  require('mongoose')


// get all diseases
const getalldisease = async (req,res)=>{
    const disease = await Disease.find({}).sort({createdAt:-1})
    
    res.status(200).json(disease)
} 


// get a single disease

const getdisease = async (req,res)=>{
    const {id} = req.params

    // check weather the id is correct or ont
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such disease'})
    }
    const disease = await Disease.findById(id)

    if (!disease)
    {
        return res.status(404).json({error:'No such disease'})
    }
    res.status(200).json(disease)
} 


// create a new disease
const createdisease = async (req, res) => {
    const { crop, disease,treatment } = req.body;
  
    let emptyFields = [];

    if (!crop) {
        
      emptyFields.push('Crop');
    }

   

    if (emptyFields.length > 0) {

      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
  
    try {
      const diseas = await Disease.create({crop,disease,treatment });
      res.status(201).json(diseas);
    } 
    
    catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  };



// delete a single disease
const deletedisease = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such disease'})
    }
    const disease = await Disease.findOneAndDelete({_id: id})

    if (!disease)
    {
        return res.status(404).json({error:'No such disease'})
    }
    res.status(200).json(disease)
        
} 

// update a disease
const updatedisease = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such disease'})
    }
    const disease = await Disease.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!disease)
    {
        return res.status(404).json({error:'No such Workout'})
    }
    res.status(200).json(disease)
        
} 


module.exports ={
    createdisease,
    getalldisease,
    getdisease,
    deletedisease,
    updatedisease

}