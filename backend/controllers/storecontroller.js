const Products = require('../models/productmodel')
const mongoose =  require('mongoose')


// get all products
const getallproduct = async (req,res)=>{
    const products = await Products.find({}).sort({createdAt:-1})
    
    res.status(200).json({products})
} 


// get a single product

const getproduct = async (req,res)=>{
    const {id} = req.params

    // check weather the id is correct or ont
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such product'})
    }
    const product = await Products.findById(id)

    if (!product)
    {
        return res.status(404).json({error:'No such Product'})
    }
    res.status(200).json(product)
} 


module.exports ={
    getallproduct,
    getproduct
}