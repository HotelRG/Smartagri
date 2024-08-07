const Rental = require('../models/rentalmodel')
const mongoose =  require('mongoose')


// get all rentals
const getallrental = async (req,res)=>{
    const rentals = await Rental.find({}).sort({createdAt:-1})
    
    res.status(200).json({rentals})
} 


// get a single rental

const getrental = async (req,res)=>{
    const {id} = req.params

    // check weather the id is correct or ont
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such rental'})
    }
    const rental = await Rental.findById(id)

    if (!rental)
    {
        return res.status(404).json({error:'No such rental'})
    }
    res.status(200).json(rental)
} 


module.exports ={
    getallrental,
    getrental
}