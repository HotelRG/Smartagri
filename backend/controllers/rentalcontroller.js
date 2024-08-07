const Rental = require('../models/rentalmodel')
const mongoose =  require('mongoose')


// get all Rental
const getallrental = async (req,res)=>{
    const user_id=req.user._id
    const rental = await Rental.find({user_id}).sort({createdAt:-1})
    
    res.status(200).json(rental)
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

// create a new rental
const createrental = async (req, res) => {
    const Title = req.body.Title
    const Price = req.body.Price
    const Location = req.body.Location
    const Duration = req.body.Duration
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
    if(!Location){
        emptyFields.push('Location')
    }
    if(!Duration){
        emptyFields.push('Duration')
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
    if(!imageurl){
        emptyFields.push('Image required')
    }
    if(!Address){
        emptyFields.push('Address required')
    }
    if(emptyFields.length > 0){
     return res.status(400).json({error:'Please fill in all the fields', emptyFields})    
    }

    try {
        
        // Add document to the database
        const rental = await Rental.create({ Title, Price,Location,Duration, Description,Address,user_id,Category,imageurl });
        res.status(201).json(rental); // Send the created rental as response
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle error properly
    }
};


// delete a single rental
const deleterental = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such rental'})
    }
    const rental = await Rental.findOneAndDelete({_id: id})

    if (!rental)
    {
        return res.status(404).json({error:'No such Workout'})
    }
    res.status(200).json(rental)
        
} 

// update a rental
const updaterental = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such rental'})
    }
    const rental = await Rental.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!rental)
    {
        return res.status(404).json({error:'No such Workout'})
    }
    res.status(200).json(rental)
        
} 


module.exports ={
    createrental,
    getallrental,
    getrental,
    deleterental,
    updaterental

}