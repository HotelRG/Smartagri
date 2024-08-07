const Products = require('../models/productmodel')
const mongoose =  require('mongoose')


// get all products
const getallproduct = async (req,res)=>{
    const user_id=req.user._id
    const products = await Products.find({user_id}).sort({createdAt:-1})
    
    res.status(200).json(products)
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

// create a new product
const createproduct = async (req, res) => {
    const Title = req.body.Title
    const Price = req.body.Price
    const Description = req.body.Description
    const Address = req.body.Address
    
    const user_id = req.user._id
    const Category = req.body.Category
    const imageurl = req.file.path
    
    
    let emptyFields = []
    if(!Title){
        emptyFields.push('Title')
    }
    if(!Price){
        emptyFields.push('Price')
    }
    if(!Description){
        emptyFields.push('Description')
    }
    if(Price<0)
    {
       return res.status(400).json({error: 'Price cannot be negative' ,emptyFields })  
    }
    if(!Category)
    {
       return res.status(400).json({error: 'Select Category' ,emptyFields })  
    }
    if(!imageurl)
        {
           return res.status(400).json({error: 'Image Required' ,emptyFields })  
        }
        if(!Address)
            {
               return res.status(400).json({error: 'Address Required' ,emptyFields })  
            }
    if(emptyFields.length > 0){
     return res.status(400).json({error:'Please fill in all the fields', emptyFields})    
    }

    try {
        
        // Add document to the database
        const product = await Products.create({ Title, Price, Description,Address,user_id,Category,imageurl });
        res.status(201).json(product); // Send the created product as response
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle error properly
    }
};


// delete a single product
const deleteproduct = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such product'})
    }
    const product = await Products.findOneAndDelete({_id: id})

    if (!product)
    {
        return res.status(404).json({error:'No such Workout'})
    }
    res.status(200).json(product)
        
} 

// update a product
const updateproduct = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such product'})
    }
    const product = await Products.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!product)
    {
        return res.status(404).json({error:'No such Workout'})
    }
    res.status(200).json(product)
        
} 


module.exports ={
    createproduct,
    getallproduct,
    getproduct,
    deleteproduct,
    updateproduct

}