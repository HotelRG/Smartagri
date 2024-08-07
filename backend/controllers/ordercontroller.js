const Order = require('../models/ordermodel')
const mongoose =  require('mongoose')



// get all orders
const getallorder = async (req, res) => {
  const userId = req.user._id
  try {
      const orders = await Order.find({
          $or: [{ vender_id: userId }, { user_id: userId }]
      }).sort({ createdAt: -1 })

      res.status(200).json(orders)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}



// get a single order

const getorder = async (req,res)=>{
    const {id} = req.params

    // check weather the id is correct or ont
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such order'})
    }
    const order = await Order.findById(id)

    if (!order)
    {
        return res.status(404).json({error:'No such order'})
    }
    res.status(200).json(order)
} 


// create a new order
const createorder = async (req, res) => {
    const { product_id,vender_id,address,  quantity,total,paymentmethod,status,imageurl } = req.body
  
    let emptyFields = []

    if (!product_id) {
        
      emptyFields.push('Product ID')
    }

    if (!vender_id) {

      emptyFields.push('Vender_id')
    }
    if (!address) {

      emptyFields.push('Address')
    }


    if (!quantity) {

      emptyFields.push('Quantity')
    }

    if (quantity < 1) {

      return res.status(400).json({ error: 'Quantity cannot be less than 1', emptyFields })
    }
    if (!total) {

      emptyFields.push('Total')
    }
    if(!paymentmethod)
      {
        emptyFields.push('Quantity')
      }
      if(!imageurl)
        {
           return res.status(400).json({error: 'Image Required' ,emptyFields })  
        }
    if (emptyFields.length > 0) {

      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    
    try {
      const user_id = req.user._id
      const order = await Order.create({user_id, product_id,vender_id,address,  quantity,total,paymentmethod,status,imageurl })
      res.status(201).json(order)
    } 
    
    catch (error) {
      res.status(400).json({ error: error.message })
    }
    
  }



// delete a single order
const deleteorder = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such order'})
    }
    const order = await Order.findOneAndDelete({_id: id})

    if (!order)
    {
        return res.status(404).json({error:'No such order'})
    }
    res.status(200).json(order)
        
} 

// update a order
const updateorder = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such order'})
    }
    const order = await Order.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!order)
    {
        return res.status(404).json({error:'No such Order'})
    }
    res.status(200).json(order)
        
} 


module.exports ={
    createorder,
    getallorder,
    getorder,
    deleteorder,
    updateorder

}