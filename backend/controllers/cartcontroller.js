const Cart = require('../models/cartmodel')
const mongoose =  require('mongoose')


// get all carts
const getallcart = async (req,res)=>{
    const user_id=req.user._id
    const cart = await Cart.find({user_id}).sort({createdAt:-1})
    
    res.status(200).json(cart)
} 


// get a single cart

const getcart = async (req,res)=>{
    const {id} = req.params

    // check weather the id is correct or ont
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such cart'})
    }
    const cart = await Cart.findById(id)

    if (!cart)
    {
        return res.status(404).json({error:'No such cart'})
    }
    res.status(200).json(cart)
} 


// create a new cart
const createcart = async (req, res) => {
    const { product_id, quantity } = req.body;
  
    let emptyFields = [];

    if (!product_id) {
        
      emptyFields.push('Product ID');
    }

    if (!quantity) {

      emptyFields.push('Quantity');
    }

    if (quantity < 1) {

      return res.status(400).json({ error: 'Quantity cannot be less than 1', emptyFields });
    }

    if (emptyFields.length > 0) {

      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
  
    try {
      const user_id = req.user._id
      const cart = await Cart.create({user_id, product_id,  quantity });
      res.status(201).json(cart);
    } 
    
    catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  };



// delete a single cart
const deletecart = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such cart'})
    }
    const cart = await Cart.findOneAndDelete({_id: id})

    if (!cart)
    {
        return res.status(404).json({error:'No such cart'})
    }
    res.status(200).json(cart)
        
} 

// update a cart
const updatecart = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such cart'})
    }
    const cart = await Cart.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!cart)
    {
        return res.status(404).json({error:'No such Workout'})
    }
    res.status(200).json(cart)
        
} 


module.exports ={
    createcart,
    getallcart,
    getcart,
    deletecart,
    updatecart

}