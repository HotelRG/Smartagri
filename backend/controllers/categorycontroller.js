const categories = require('../models/categorymodel')
const mongoose =  require('mongoose')


// get all categorys
const getallcategory = async (req,res)=>{
    
    const categorys = await categories.find({}).sort({createdAt:-1})

    res.status(200).json(categorys)
} 

// get a single category

const getcategory = async (req,res)=>{
    const {id} = req.params

    // check weather the id is correct or ont
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Category id not valid'})
    }
    const category = await categories.findById(id)

    if (!category)
    {
        return res.status(404).json({error:'No such category'})
    }
    res.status(200).json(category)
} 

// create a new category

const createcategory = async (req, res) => {
    const { Name, Type } = req.body;

    let emptyFields = []
    if(!Name){
        emptyFields.push('Title')
    }
    if(!Type){
        emptyFields.push('Type')
    }
    if(emptyFields.length > 0){
     return res.status(400).json({error:'Please fill in all the fields', emptyFields})    
    }

    try {
        const user_id = req.user._id
        // Add document to the database
        const category = await categories.create({ Name, Type, user_id});
        
        res.status(201).json(category); // Send the created product as response
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle error properly
    }
};

// delete a single category
const deletecategory = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such category'})
    }
    const category = await categories.findOneAndDelete({_id: id})

    if (!category)
    {
        return res.status(404).json({error:'No such category'})
    }
    res.status(200).json(category)
        
} 



module.exports = {
    createcategory,
    getallcategory,
    getcategory,
    deletecategory
   

}